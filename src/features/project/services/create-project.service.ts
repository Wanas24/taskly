type CreateProjectPayload = {
  title: string;
  description?: string;
};

export async function createProject(
  payload: CreateProjectPayload,
  accessToken: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects`,
    {
      method: "POST",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: payload.title,
        description: payload.description || null,
      }),
    },
  );

  if (!response.ok) {
    let errorMessage = "Failed To Add New Project, Try Again Later";

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

    throw new Error(errorMessage);
  }
}