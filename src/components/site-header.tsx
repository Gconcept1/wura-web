import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-stone/20">
      <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-obsidian"
        >
          WURA
        </Link>
        <div className="flex items-center gap-6 font-sans text-sm">
          <Link href="/shop" className="text-obsidian hover:text-gold-deep">
            Shop
          </Link>
          {user ? (
            <Link href="/account" className="text-obsidian hover:text-gold-deep">
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-obsidian px-4 py-2 text-ivory transition-opacity hover:opacity-90"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
