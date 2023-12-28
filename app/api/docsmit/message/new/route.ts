import { NextResponse } from "next/server";
import {
  fetchWithResponse,
  getDocsmitEndpoint,
  transformPayload,
} from "@/app/_utils/restClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payload, token } = transformPayload(body);

    // TODO: To handle elegantly
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await fetchWithResponse(
      getDocsmitEndpoint("messages/new"),
      "POST",
      payload,
      token
    );

    return NextResponse.json({
      data,
    });
  } catch (e) {
    console.log(e);
  }
}
