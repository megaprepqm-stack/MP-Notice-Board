import { createDisplayAction } from '@/actions/display-actions';
import { supabaseServer } from '@/lib/supabase/server';

export default async function DisplaysPage() {
  const { data: displays } = await supabaseServer.from('displays').select('*').order('created_at', { ascending: false });

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Displays</h1>
      <form
        action={async (formData) => {
          'use server';
          await createDisplayAction({
            name: String(formData.get('name')),
            slug: String(formData.get('slug')),
            resolution: String(formData.get('resolution'))
          });
        }}
        className="grid md:grid-cols-4 gap-2"
      >
        <input name="name" placeholder="Display name" className="p-2 rounded bg-slate-900 border border-slate-700" required />
        <input name="slug" placeholder="display-slug" className="p-2 rounded bg-slate-900 border border-slate-700" required />
        <select name="resolution" className="p-2 rounded bg-slate-900 border border-slate-700"><option>1920x1080</option><option>3840x2160</option></select>
        <button className="rounded bg-cyan-500 text-black font-medium">Create</button>
      </form>
      <div className="grid gap-3">
        {displays?.map((d) => (
          <div key={d.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
            <div><p className="font-medium">{d.name}</p><p className="text-sm text-slate-400">/{d.slug}</p></div>
            <p className={d.is_enabled ? 'text-green-400' : 'text-yellow-400'}>{d.is_enabled ? 'Live' : 'Disabled'}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
