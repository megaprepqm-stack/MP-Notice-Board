import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const { displayId } = await req.json();

  const { data: slides, error: slideError } = await supabaseServer
    .from('slides')
    .select('*')
    .eq('display_id', displayId)
    .order('sort_order');

  if (slideError) return NextResponse.json({ error: slideError.message }, { status: 400 });

  const { count, error: countError } = await supabaseServer
    .from('publish_history')
    .select('*', { count: 'exact', head: true })
    .eq('display_id', displayId);

  if (countError) return NextResponse.json({ error: countError.message }, { status: 400 });

  const version = (count ?? 0) + 1;

  const { error } = await supabaseServer.from('publish_history').insert({
    display_id: displayId,
    version,
    snapshot: { slides }
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, version, publicUrl: `/display/${displayId}` });
}
