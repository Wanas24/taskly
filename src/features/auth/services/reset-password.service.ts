export async function resetPassword(
  password: string,
  accessToken: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    },
  );

  if (!response.ok) {
    let errorMessage =
      "Failed To Update Password, Try Again Later";

    try {
      const errorData = await response.json();

      if (errorData?.msg) {
        errorMessage = errorData.msg;
      } else if (errorData?.error_description) {
        errorMessage = errorData.error_description;
      }
    } catch {
      // Keep fallback error message
    }

    const error = new Error(errorMessage);

    Object.assign(error, {
      status: response.status,
    });

    throw error;
  }
}