import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromRequest, verifyToken } from "@/lib/security";

export async function GET(req: NextRequest) {
  const token = getTokenFromRequest(req);
  const payload = token ? verifyToken(token) : null;

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await prisma.progress.findMany({
    where: { userId: payload.userId },
    include: { lesson: true },
  });

  return NextResponse.json({ progress });
}

export async function POST(req: NextRequest) {
  const token = getTokenFromRequest(req);
  const payload = token ? verifyToken(token) : null;

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const lessonId = String(body.lessonId || "");
  const percentage = Math.max(0, Math.min(100, Number(body.percentage || 0)));

  if (!lessonId) {
    return NextResponse.json({ error: "Invalid lessonId" }, { status: 400 });
  }

  const result = await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: payload.userId,
        lessonId,
      },
    },
    update: { percentage },
    create: {
      userId: payload.userId,
      lessonId,
      percentage,
    },
  });

  return NextResponse.json({ progress: result });
}
