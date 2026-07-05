import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.storeSetting.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const items = await req.json();

  for (const item of items) {
    await prisma.storeSetting.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: { key: item.key, value: item.value },
    });
  }

  return NextResponse.json({ success: true });
}
