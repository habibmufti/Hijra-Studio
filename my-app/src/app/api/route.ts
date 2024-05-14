export const dynamic = "force-dynamic"; // defaults to auto
import { Message } from "../../types/interfaces";
export async function GET(request: Request) {
    const response: Message = { message: "servernya jalan cuy" };
    return new Response(JSON.stringify(response), { status: 200 });
}
