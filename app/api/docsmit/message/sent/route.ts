import { NextResponse } from "next/server";
import {
  fetchWithResponse,
  getDocsmitEndpoint,
  transformPayload,
} from "@/app/_utils/restClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = transformPayload(body);

    // @TODO: To handle elegantly
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const response = await fetchWithResponse(
      getDocsmitEndpoint("messages/sent"),
      "GET",
      null,
      token
    );

    return NextResponse.json(response);
  } catch (e: any) {
    return new NextResponse(e.errors, { status: 401 });
  }
}
