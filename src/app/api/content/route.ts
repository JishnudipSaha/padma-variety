import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const content = await prisma.content.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const items = await req.json();

  for (const item of items) {
    await prisma.content.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: { key: item.key, value: item.value, type: item.type || "text" },
    });
  }

  return NextResponse.json({ success: true });
}
