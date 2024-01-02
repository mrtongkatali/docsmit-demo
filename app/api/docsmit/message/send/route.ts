import { NextResponse } from "next/server";
import {
  fetchWithResponse,
  getDocsmitEndpoint,
  transformPayload,
} from "@/app/_utils/restClient";
import * as yup from "yup";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payload, token } = transformPayload(body);

    // @TODO: To handle elegantly
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await fetchWithResponse(
      getDocsmitEndpoint(`messages/${payload.messageID}/send`),
      "POST",
      {
        messageID: `'${payload.messageID}'`,
      },
      token
    );

    return NextResponse.json({
      data,
    });
  } catch (e: any) {
    return new NextResponse(e.errors, { status: 401 });
  }
}
