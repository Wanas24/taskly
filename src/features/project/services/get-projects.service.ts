export type Project = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
};

export async function getProjects(accessToken: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_projects`,
    {
      method: "GET",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    let errorMessage = "Failed To Get Projects, Try Again Later";

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

  return response.json() as Promise<Project[]>;
}