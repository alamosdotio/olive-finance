import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tokenId = req.nextUrl.searchParams.get("id");

  const SECRET_TOKEN = 'af5edce9-8fd7-443a-b238-32223ae3420c'; //important! todo: put this in env file
  const SUBDOMAIN = 'olivefi-pythnet-b3f5';//important! todo: put this in env file

  if (!tokenId) {
    return NextResponse.json({ error: "Missing price feed ID" }, { status: 400 });
  }

  //https://<unique-subdomain>.mainnet.pythnet.rpcpool.com/hermes/

  const url = `https://${SUBDOMAIN}.mainnet.pythnet.rpcpool.com/${SECRET_TOKEN}/hermes/v2/updates/price/latest?ids[]=${tokenId}&parsed=true&ignore_invalid_price_ids=true`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: `Hermes error ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}


