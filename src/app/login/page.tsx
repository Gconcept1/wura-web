import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signIn, signUp, signInWithGoogle } from "@/app/auth/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; error?: string; message?: string }>;
}) {
  // Already signed in? Go to the account.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/account");

  const { mode, error, message } = await searchParams;
  const isSignup = mode === "signup";

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="font-serif text-3xl tracking-tight text-obsidian"
          >
            WURA
          </Link>
          <p className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-gold-deep">
            {isSignup ? "Create your account" : "Welcome back"}
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-lg border border-oxblood/30 bg-oxblood/5 px-4 py-3 font-sans text-sm text-oxblood">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-4 rounded-lg border border-verdigris/30 bg-verdigris/5 px-4 py-3 font-sans text-sm text-verdigris">
            {message}
          </p>
        )}

        <form
          action={isSignup ? signUp : signIn}
          className="flex flex-col gap-3"
        >
          {isSignup && (
            <input
              name="full_name"
              type="text"
              placeholder="Full name"
              autoComplete="name"
              className="rounded-lg border border-stone/40 bg-white px-4 py-3 font-sans text-sm text-obsidian outline-none focus:border-gold"
            />
          )}
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
            className="rounded-lg border border-stone/40 bg-white px-4 py-3 font-sans text-sm text-obsidian outline-none focus:border-gold"
          />
          <input
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            className="rounded-lg border border-stone/40 bg-white px-4 py-3 font-sans text-sm text-obsidian outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="mt-1 rounded-full bg-obsidian px-6 py-3 font-sans text-sm text-ivory transition-opacity hover:opacity-90"
          >
            {isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-stone/30" />
          <span className="font-sans text-xs uppercase tracking-widest text-stone">
            or
          </span>
          <span className="h-px flex-1 bg-stone/30" />
        </div>

        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="w-full rounded-full border border-stone/40 bg-white px-6 py-3 font-sans text-sm text-obsidian transition-colors hover:border-gold"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-8 text-center font-sans text-sm text-smoke">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-gold-deep underline">
                Sign in
              </Link>
            </>
          ) : (
            <>
              New to WURA?{" "}
              <Link
                href="/login?mode=signup"
                className="text-gold-deep underline"
              >
                Create an account
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
