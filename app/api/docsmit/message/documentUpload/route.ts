import { NextResponse } from "next/server";
import { getDocsmitEndpoint } from "@/app/_utils/restClient";
import { writeFile } from "fs/promises";
import { join } from "path";
import axios from "axios";

const fs = require("fs");
const fd = require("form-data");

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File = data.get("file") as File;
    const token = data.get("token") as string;
    const messageID = data.get("messageID");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join("/tmp", file.name);
    await writeFile(path, buffer);

    if (!fs.existsSync(path)) {
      console.error("File not found:", path);
      return;
    }

    const fileStream = fs.createReadStream(path);

    const formData = new fd();
    formData.append("file", fileStream, {
      filename: file.name,
    });

    const config = {
      method: "post",
      url: getDocsmitEndpoint(`messages/${messageID}/upload`),
      headers: {
        Authorization: "Basic " + Buffer.from(`${token}:`).toString("base64"),
        ...formData.getHeaders(),
      },
      data: formData,
    };

    // @NOTE: For some reasons, multi-part/form upload doesn't work properly in node-fetch, use axios client for this particular instance
    const response = await axios(config);

    fs.unlink(path, () => {});

    return NextResponse.json({
      data: response.data,
    });
  } catch (e: any) {
    console.log("upload error - ", e.message);
    return new NextResponse(e.errors, { status: 401 });
  }
}
