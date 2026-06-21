import Link from "next/link";

export default function AuthCodeError() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="font-serif text-4xl text-obsidian">Something went wrong</h1>
      <p className="max-w-md font-sans text-smoke">
        We couldn&apos;t complete your sign-in. The link may have expired or
        already been used.
      </p>
      <Link
        href="/login"
        className="rounded-full bg-obsidian px-6 py-3 font-sans text-sm text-ivory transition-opacity hover:opacity-90"
      >
        Back to sign in
      </Link>
    </main>
  );
}
