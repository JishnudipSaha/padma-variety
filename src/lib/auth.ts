import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const SESSION_SECRET = process.env.NEXTAUTH_SECRET || "padma-store-secret-key";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

// Simple session token: base64 encoded JSON with HMAC signature
function sign(payload: string): string {
  const crypto = require("crypto");
  const sig = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(payload).toString("base64url") + "." + sig;
}

function verify(token: string): SessionUser | null {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return null;
    const payload = Buffer.from(payloadB64, "base64url").toString();
    const crypto = require("crypto");
    const expected = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
    if (sig !== expected) return null;
    return JSON.parse(payload) as SessionUser;
  } catch {
    return null;
  }
}

export async function createSession(user: SessionUser): Promise<string> {
  const token = sign(JSON.stringify(user));
  const cookieStore = await cookies();
  cookieStore.set("admin-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return token;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;
  if (!token) return null;
  return verify(token);
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
}

export async function login(email: string, password: string): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  return { id: user.id, name: user.name, email: user.email };
}
