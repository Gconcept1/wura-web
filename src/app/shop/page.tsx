import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { ngn, firstImage } from "@/lib/format";

export const metadata = {
  title: "Shop — WURA",
  description: "Verified hair and the stylist to lay it. One protected payment.",
};

type ShopLook = {
  slug: string;
  title: string;
  hero_media: unknown;
  featured: boolean;
  matched_partner: { display_name: string } | null;
  look_products: { products: { price_kobo: number; texture: string | null } | null }[];
};

export default async function ShopPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("looks")
    .select(
      `slug, title, hero_media, featured,
       matched_partner:partners!looks_matched_partner_id_fkey(display_name),
       look_products(products(price_kobo, texture))`,
    )
    .eq("is_published", true)
    .order("featured", { ascending: false });

  const looks = (data ?? []) as unknown as ShopLook[];

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 py-12">
      <header className="mb-10">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-deep">
          The shop
        </p>
        <h1 className="mt-2 font-serif text-5xl text-obsidian">
          Verified hair, vetted hands
        </h1>
        <p className="mt-3 max-w-xl font-sans text-smoke">
          Every look is the exact hair plus the stylist to lay it — held safe
          until you say yes.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {looks.map((look) => {
          const img = firstImage(look.hero_media);
          const price = look.look_products?.[0]?.products?.price_kobo ?? null;
          return (
            <Link
              key={look.slug}
              href={`/looks/${look.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-linen">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h2 className="font-serif text-lg text-obsidian">
                  {look.title}
                </h2>
                <span className="shrink-0 font-sans text-sm text-obsidian">
                  {price != null ? `from ${ngn(price)}` : ""}
                </span>
              </div>
              <p className="font-sans text-sm text-smoke">
                {look.matched_partner?.display_name
                  ? `with ${look.matched_partner.display_name}`
                  : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
