import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { HELIUS_API_KEY, HELIUS_ENDPOINT } from "@/utils/const";

// GET handler
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const programId = searchParams.get("programId");

  if (!programId) {
    return NextResponse.json(
      { error: "No programId parameter provided" },
      { status: 400 }
    );
  }

  try {
    const res = await axios.get(
      `${HELIUS_ENDPOINT}/${programId}/transactions?api-key=${HELIUS_API_KEY}`
    );
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
