import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ngn } from "@/lib/format";

type ProductImage = { url: string; alt?: string };

type LookDetail = {
  slug: string;
  title: string;
  editorial_copy: string | null;
  matched_partner: {
    display_name: string;
    rating: number;
    rating_count: number;
    areas: string[];
  } | null;
  matched_service: {
    name: string;
    base_price_kobo: number;
    duration_min: number;
  } | null;
  look_products: {
    products: {
      title: string;
      description: string | null;
      price_kobo: number;
      images: unknown;
      texture: string | null;
      origin: string | null;
      density: string | null;
      length_in: number | null;
      type: string;
      vendor: {
        display_name: string;
        areas: string[];
        rating: number;
        rating_count: number;
      } | null;
    } | null;
  }[];
};

export default async function LookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("looks")
    .select(
      `slug, title, editorial_copy,
       matched_partner:partners!looks_matched_partner_id_fkey(display_name, rating, rating_count, areas),
       matched_service:services!looks_matched_service_id_fkey(name, base_price_kobo, duration_min),
       look_products(products(title, description, price_kobo, images, texture, origin, density, length_in, type,
         vendor:partners!products_partner_id_fkey(display_name, areas, rating, rating_count)))`,
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  const look = data as unknown as LookDetail | null;
  const product = look?.look_products?.[0]?.products;
  if (!look || !product) notFound();

  const images = (Array.isArray(product.images) ? product.images : []) as ProductImage[];
  const hero = images[0] ?? { url: "/assets/stilllife-hallmark.jpg", alt: "" };
  const hairPrice = product.price_kobo;
  const installPrice = look.matched_service?.base_price_kobo ?? 0;
  const total = hairPrice + installPrice;

  const specs: [string, string | null][] = [
    ["Texture", product.texture],
    ["Origin", product.origin],
    ["Density", product.density],
    ["Length", product.length_in ? `${product.length_in}″` : null],
    ["Type", product.type],
  ];

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 py-10">
      <nav className="mb-6 font-sans text-sm text-smoke">
        <Link href="/shop" className="hover:text-gold-deep">
          Shop
        </Link>{" "}
        / <span className="text-obsidian">{look.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-linen">
            <Image
              src={hero.url}
              alt={hero.alt ?? ""}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {images.slice(0, 4).map((im, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg bg-linen"
                >
                  <Image
                    src={im.url}
                    alt={im.alt ?? ""}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-verdigris">
            Wura-Verified · Authentic
          </p>
          <h1 className="mt-2 font-serif text-4xl text-obsidian">
            {look.title}
          </h1>
          <p className="mt-2 font-sans text-sm text-smoke">
            Sold by{" "}
            <span className="text-obsidian">
              {product.vendor?.display_name}
            </span>
            {product.vendor?.areas?.length
              ? ` · ${product.vendor.areas.join(", ")}`
              : ""}{" "}
            · ★ {product.vendor?.rating} ({product.vendor?.rating_count})
          </p>

          <p className="mt-5 font-sans leading-relaxed text-smoke">
            {product.description ?? look.editorial_copy}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 font-sans text-sm">
            {specs
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-stone/20 py-1">
                  <dt className="text-smoke">{k}</dt>
                  <dd className="text-obsidian">{v}</dd>
                </div>
              ))}
          </dl>

          {/* Buy the Look box */}
          <div className="mt-8 rounded-xl border border-stone/30 bg-white p-5">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-deep">
              Buy the look — protected
            </p>
            <div className="mt-3 space-y-2 font-sans text-sm">
              <Row label={`This hair · ${product.title}`} value={ngn(hairPrice)} />
              <Row
                label={
                  look.matched_service && look.matched_partner
                    ? `${look.matched_service.name} · ${look.matched_partner.display_name}`
                    : "Install"
                }
                value={ngn(installPrice)}
              />
              <div className="mt-2 flex items-baseline justify-between border-t border-stone/30 pt-3">
                <span className="font-medium text-obsidian">Total</span>
                <span className="font-serif text-2xl text-obsidian">
                  {ngn(total)}
                </span>
              </div>
            </div>
            <button
              type="button"
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-full bg-obsidian px-6 py-3 font-sans text-sm text-ivory opacity-60"
              title="Checkout is coming next"
            >
              Buy the Look — protected (coming soon)
            </button>
            <p className="mt-2 text-center font-sans text-xs text-smoke">
              Held safely by Wura ✦ — released only when you confirm.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-smoke">{label}</span>
      <span className="shrink-0 text-obsidian">{value}</span>
    </div>
  );
}
