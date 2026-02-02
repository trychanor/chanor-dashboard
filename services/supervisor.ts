import { auth } from "@clerk/nextjs/server";

const BASE_API_URL = process.env.BASE_API_URL

export async function testSupervisorUsersEndpoint() {
  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error("No Clerk auth token found");
  }

  const res = await fetch(
    `${BASE_API_URL}/supervisors/analytics/users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-apikey": process.env.SUPERVISOR_API_KEY as string,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return {
    status: res.status,
    data,
  };
}
