import { NextResponse } from "next/server";
import {
  multiPartFormPostWithResponse,
  getDocsmitEndpoint,
} from "@/app/_utils/restClient";
import { writeFile } from "fs/promises";
import { join } from "path";

const fs = require("fs");
const fd = require('form-data');

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
