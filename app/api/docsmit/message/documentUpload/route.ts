import { NextResponse } from "next/server";
import {
  multiPartFormPostWithResponse,
  getDocsmitEndpoint,
  transformPayload,
} from "@/app/_utils/restClient";
import {
  convertBase64ToBuffer,
  convertBase64ToBlob,
} from "@/app/_helpers/utils";
import { writeFile } from "fs/promises";
import { join } from "path";

const fs = require("fs");
const fd = require('form-data');

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { payload, token } = transformPayload(body);

//     const fileBlob = convertBase64ToBlob(payload.fileAttachment);
//     const formData = new FormData();
//     formData.append('file', fileBlob, payload.fileName);

//     // @TODO: To handle elegantly
//     if (!token) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const data = await multiPartFormPostWithResponse(
//       getDocsmitEndpoint(`messages/${payload.messageID}/upload`),
//       formData,
//       token
//     );

//     return NextResponse.json({
//       data,
//     });
//   } catch (e: any) {
//     console.log("upload error - ", e);
//     return new NextResponse(e.errors, { status: 401 });
//   }
// }

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File = data.get("file") as File;
    const token = data.get("token") as string;
    const messageID = data.get("messageID");

    // Method 1
    //   const response = await multiPartFormPostWithResponse(
    //     getDocsmitEndpoint(`messages/${messageID}/upload`),
    //     data,
    //     token
    //   );

    //   console.log("response - ", response);

    // const token = data.get('token')
    // const messageID = data.get('messageID');

    // Method 2
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join("/tmp", file.name);
    await writeFile(path, buffer);

    if (!fs.existsSync(path)) {
        console.error('File not found:', path);
        return;
      }

    const fileStream = fs.createReadStream(path);
    const formData = new fd();
    formData.append("file", fileStream);

    const response = await multiPartFormPostWithResponse(
      getDocsmitEndpoint(`messages/${messageID}/upload`),
      formData,
      token
    );

    console.log("response - ", response);

    return NextResponse.json({
      data,
    });
  } catch (e: any) {
    console.log("upload error - ", e);
    return new NextResponse(e.errors, { status: 401 });
  }
}
