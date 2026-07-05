import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const banners = await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(banners);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const banner = await prisma.banner.create({
    data: {
      title: body.title,
      subtitle: body.subtitle || null,
      image: body.image || "",
      link: body.link || null,
      active: body.active ?? true,
      sortOrder: body.sortOrder || 0,
    },
  });
  return NextResponse.json(banner, { status: 201 });
}
