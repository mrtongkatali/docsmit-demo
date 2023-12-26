import { NextResponse } from "next/server";
// import { createHash } from "crypto"
import { getDocsmitEndpoint, postWithResponse } from "@/app/_utils/restClient";

export async function GET() {
  try {
    const email: string = process.env.DOCSMIT_API_EMAIL || "";
    // const rawPassword: string = process.env.DOCSMIT_API_PASSWORD || ""
    const softwareID: string = process.env.DOCSMIT_API_SOFTWARE_ID || "";

    const payload = {
      email,
      // password: createHash('sha512').update(rawPassword).digest('hex'),
      password:
        "f5a23e5066e4552f0484f56d0a0f6831151bd829cfdd895dea1ce0524d76a44e4bfa47f04b43cdc08027f9a66bab0766cf8ef316dfeb92d7e8c09035d7c3a822",
      softwareID,
    };

    const data = await postWithResponse(getDocsmitEndpoint("token"), payload);

    return NextResponse.json({
      data,
    });
  } catch (e) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
