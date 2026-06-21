import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  // Verify live Supabase connectivity from a Server Component.
  let dbStatus: { ok: boolean; detail: string };
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("looks")
      .select("*", { count: "exact", head: true });
    dbStatus = error
      ? { ok: false, detail: error.message }
      : { ok: true, detail: `connected · ${count ?? 0} published looks` };
  } catch (e) {
    dbStatus = { ok: false, detail: (e as Error).message };
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold-deep">
        The standard for real
      </span>

      <h1 className="font-serif text-6xl font-light tracking-tight text-obsidian sm:text-7xl">
        WURA
      </h1>

      <p className="max-w-xl font-sans text-lg leading-relaxed text-smoke">
        Africa&apos;s modern-luxury marketplace for hair and beauty. Verified
        hair, vetted stylists, one protected payment — from cart to crown.
      </p>

      <div className="h-px w-24 bg-gold" aria-hidden />

      <div
        className={`flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm ${
          dbStatus.ok
            ? "border-verdigris/30 text-verdigris"
            : "border-oxblood/30 text-oxblood"
        }`}
      >
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            dbStatus.ok ? "bg-verdigris" : "bg-oxblood"
          }`}
          aria-hidden
        />
        Supabase {dbStatus.detail}
      </div>
    </main>
  );
}
