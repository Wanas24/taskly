export async function forgotPassword(email: string) {
  const redirectTo = `${window.location.origin}/reset-password`;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`,
    {
      method: "POST",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    },
  );

  if (!response.ok) {
    let errorMessage =
      "Failed To Send Reset Link, Try Again Later";

    try {
      const errorData = await response.json();

      if (errorData?.message) {
        errorMessage = errorData.message;
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