import { NextRequest, NextResponse } from 'next/server';

const hits = new Map<string, { count: number; ts: number }>();

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();
  const item = hits.get(ip);
  if (!item || now - item.ts > 60_000) {
    hits.set(ip, { count: 1, ts: now });
    return NextResponse.json({ ok: true });
  }
  item.count += 1;
  if (item.count > 60) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  return NextResponse.json({ ok: true, count: item.count });
}
