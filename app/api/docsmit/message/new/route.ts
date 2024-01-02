import { NextResponse } from "next/server";
import {
  fetchWithResponse,
  getDocsmitEndpoint,
  transformPayload,
} from "@/app/_utils/restClient";
import * as yup from "yup";

const createNewMessageSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  address: yup.string().required("Address is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payload, token } = transformPayload(body);

    await createNewMessageSchema.validate(payload, { abortEarly: true });

    // @TODO: To handle elegantly
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
