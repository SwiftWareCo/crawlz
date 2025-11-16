import { auth } from "@clerk/nextjs/server";

export type GetUserIdOptions = {
  optional?: boolean;
};

/**
 * Fetches the current Clerk user id directly from the session token.
 * Throws when the user is not authenticated unless `optional` is set.
 */
export async function getUserId(options?: GetUserIdOptions) {
  const { userId } = await auth();

  if (!userId && !options?.optional) {
    throw new Error("User must be authenticated to access this resource");
  }

  return userId ?? null;
}
