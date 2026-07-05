import { NextRequest, NextResponse } from "next/server";
import { writeFile, readdir } from "fs/promises";
import { join } from "path";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export async function GET() {
  try {
    const files = await readdir(UPLOAD_DIR);
    const imageFiles = files.filter((f) =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)
    );
    return NextResponse.json({ files: imageFiles });
  } catch {
    return NextResponse.json({ files: [] });
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filepath = join(UPLOAD_DIR, filename);

  await writeFile(filepath, buffer);

  return NextResponse.json({ filename, url: `/uploads/${filename}` });
}
