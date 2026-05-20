import Link from 'next/link';
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data } = await supabaseServer.auth.getUser();
  if (!data.user) redirect('/login');

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-slate-800 p-4 space-y-2 bg-slate-950">
        <h2 className="font-semibold mb-4">MegaPrep CMS</h2>
        {[
          ['Dashboard', '/dashboard'],
          ['Displays', '/dashboard/displays'],
          ['Slides', '/dashboard/slides'],
          ['Templates', '/dashboard/templates'],
          ['Settings', '/dashboard/settings']
        ].map(([label, href]) => (
          <Link key={href} href={href} className="block rounded px-3 py-2 hover:bg-slate-800">
            {label}
          </Link>
        ))}
      </aside>
      <section>{children}</section>
    </div>
  );
}
