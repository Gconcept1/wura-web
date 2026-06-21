import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // The handle_new_user() DB trigger creates this row on signup.
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, is_partner, is_admin, locale, created_at")
    .eq("id", user.id)
    .single();

  const role = profile?.is_admin
    ? "Admin"
    : profile?.is_partner
      ? "Partner"
      : "Customer";

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16">
      <header className="flex items-center justify-between">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-deep">
            Your account
          </p>
          <h1 className="mt-1 font-serif text-4xl text-obsidian">
            {profile?.full_name || "Welcome"}
          </h1>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-stone/40 px-5 py-2 font-sans text-sm text-obsidian transition-colors hover:border-oxblood hover:text-oxblood"
          >
            Sign out
          </button>
        </form>
      </header>

      <div className="grid gap-px overflow-hidden rounded-xl border border-stone/30 bg-stone/30 font-sans text-sm">
        <Row label="Email" value={user.email ?? "—"} />
        <Row label="Role" value={role} />
        <Row label="Phone" value={profile?.phone || "Not set"} />
        <Row label="Locale" value={profile?.locale || "en-NG"} />
        <Row
          label="Member since"
          value={
            profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : "—"
          }
        />
      </div>

      <p className="font-sans text-sm text-smoke">
        Orders, bookings and saved looks will appear here as those features come
        online.
      </p>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-ivory px-5 py-4">
      <span className="text-smoke">{label}</span>
      <span className="font-medium text-obsidian">{value}</span>
    </div>
  );
}
