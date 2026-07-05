import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      price: body.price || null,
      category: body.category,
      images: body.images || "[]",
      featured: body.featured || false,
      inStock: body.inStock ?? true,
      sortOrder: body.sortOrder || 0,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
