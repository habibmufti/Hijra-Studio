import User from "@/models/user.model";

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
  return await User.Register(request);
}
