import { NextResponse } from "next/server";
import {
  multiPartFormPostWithResponse,
  getDocsmitEndpoint,
  transformPayload,
} from "@/app/_utils/restClient";
import { convertBase64ToBuffer, convertBase64ToBlob } from "@/app/_helpers/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payload, token } = transformPayload(body);

    const fileBlob = convertBase64ToBlob(payload.fileAttachment);
    const formData = new FormData();
    formData.append('file', fileBlob, payload.fileName);

    // @TODO: To handle elegantly
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await multiPartFormPostWithResponse(
      getDocsmitEndpoint(`messages/${payload.messageID}/upload`),
      formData,
      token
    );

    return NextResponse.json({
      data,
    });
  } catch (e: any) {
    console.log("upload error - ", e);
    return new NextResponse(e.errors, { status: 401 });
  }
}
