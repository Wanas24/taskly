import type { Project } from "./get-projects.service";

export async function getSingleProject(
  projectId: string,
  accessToken: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}&select=id,name,description,created_at`,
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
    let errorMessage = "Failed To Get Project, Try Again Later";

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

  const data = (await response.json()) as Project[];

  if (!data.length) {
    const error = new Error("Project not found.");

    Object.assign(error, {
      status: 404,
    });

    throw error;
  }

  return data[0];
}