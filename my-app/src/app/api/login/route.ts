import User from "@/models/user.model";
export const dynamic = "force-dynamic"; 

export async function POST(request: Request) {
  return await User.Login(request);
}