import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Property = {
  id: string;
  public_reference: string;
  slug: string;
  name: string;
  description: string;
  city: string;
  district: string | null;
  verification_state: string;
  occupancy_state: string;
  public_visibility: boolean;
};

type Listing = {
  id: string;
  headline: string;
  description: string;
  price_minor: number;
  currency: string;
  billing_frequency: string | null;
  verification_state: string;
  status: string;
};

function label(value: string) {
  return value.replaceAll("_", " ");
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: propertyRow } = await supabase
    .from("properties")
    .select("id,public_reference,slug,name,description,city,district,verification_state,occupancy_state,public_visibility")
    .eq("slug", slug)
    .eq("public_visibility", true)
    .is("deleted_at", null)
    .maybeSingle();

  const property = propertyRow as Property | null;
  if (!property) notFound();

  const { data: listingRows } = await supabase
    .from("listings")
    .select("id,headline,description,price_minor,currency,billing_frequency,verification_state,status")
    .eq("property_id", property.id)
    .eq("status", "published")
    .is("deleted_at", null)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(1);

  const listing = (listingRows?.[0] ?? null) as Listing | null;
  if (!listing) notFound();

  const currency = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: listing.currency || "NGN",
    maximumFractionDigits: 0
  });

  return (
    <main>
      <div className="shell">
        <section className="hero compact">
          <div className="eyebrow">{property.public_reference}</div>
          <h1>{property.name}</h1>
          <p>{property.description}</p>
          <div className="property-meta">
            <span>{property.district ? `${property.district}, ` : ""}{property.city}</span>
            <span>{label(property.verification_state)}</span>
            <span>{label(property.occupancy_state)}</span>
          </div>
        </section>

        <section className="grid detail-grid">
          <article className="card">
            <div className="eyebrow">Current route</div>
            <h2>{listing.headline}</h2>
            <p>{listing.description}</p>
            <strong>{currency.format(listing.price_minor / 100)} / {listing.billing_frequency ?? "route"}</strong>
          </article>

          <article className="card">
            <div className="eyebrow">Trust state</div>
            <h2>{listing.verification_state === "verified" ? "Human-reviewed verification" : "Verification still forming"}</h2>
            <p>Evidence is kept separate from verification, and publication does not replace the underlying property proof trail.</p>
            <a className="button" href={`/api/v1/properties/${property.id}/proof`}>View proof state</a>
          </article>

          <article className="card">
            <div className="eyebrow">Next action</div>
            <h2>Inspect before you decide.</h2>
            <p>Book a physical or live-video inspection. Attendance, evidence and outcome can return to the property Pulse timeline.</p>
            <a className="button primary" href={`/inspections/new?listing=${listing.id}`}>Book inspection</a>
          </article>
        </section>
      </div>
    </main>
  );
}
