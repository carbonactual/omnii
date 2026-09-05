import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Listing = {
  id: string;
  property_id: string;
  listing_type: string;
  headline: string;
  description: string;
  price_minor: number;
  currency: string;
  billing_frequency: string | null;
  verification_state: string;
  status: string;
  deleted_at: string | null;
};

type Property = {
  id: string;
  public_reference: string;
  slug: string;
  name: string;
  property_type: string;
  description: string;
  city: string;
  district: string | null;
  verification_state: string;
  occupancy_state: string;
  public_visibility: boolean;
  deleted_at: string | null;
};

const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0
});

function label(value: string) {
  return value.replaceAll("_", " ");
}

export default async function DiscoverPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim().toLowerCase() ?? "";
  const type = params.type?.trim().toLowerCase() ?? "";
  const supabase = await createSupabaseServerClient();

  const { data: listingRows } = await supabase
    .from("listings")
    .select("id,property_id,listing_type,headline,description,price_minor,currency,billing_frequency,verification_state,status,deleted_at")
    .eq("status", "published")
    .is("deleted_at", null)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(100);

  const listings = (listingRows ?? []) as Listing[];
  const propertyIds = [...new Set(listings.map((listing) => listing.property_id))];
  const { data: propertyRows } = propertyIds.length
    ? await supabase
        .from("properties")
        .select("id,public_reference,slug,name,property_type,description,city,district,verification_state,occupancy_state,public_visibility,deleted_at")
        .in("id", propertyIds)
        .eq("public_visibility", true)
        .is("deleted_at", null)
    : { data: [] as Property[] };

  const properties = (propertyRows ?? []) as Property[];
  const propertyById = new Map(properties.map((property) => [property.id, property]));
  const visibleListings = listings
    .filter((listing) => {
      const property = propertyById.get(listing.property_id);
      if (!property) return false;
      if (type && listing.listing_type.toLowerCase() !== type) return false;
      if (!q) return true;
      const haystack = [
        listing.headline,
        listing.description,
        listing.listing_type,
        property.name,
        property.property_type,
        property.city,
        property.district ?? ""
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    })
    .map((listing) => ({ listing, property: propertyById.get(listing.property_id)! }));

  return (
    <main>
      <div className="shell">
        <header className="hero compact">
          <div className="eyebrow">Discover · live BUNK records</div>
          <h1>Find property with the truth attached.</h1>
          <p>Search published property records from the governed BUNK data layer with visible verification state and next actions.</p>
        </header>

        <form className="searchbar" action="/discover" role="search">
          <input aria-label="Search location or property" name="q" defaultValue={params.q ?? ""} placeholder="Wuse 2, Jabi, two-bedroom, shortlet…" />
          <select aria-label="Property route" name="type" defaultValue={params.type ?? ""}>
            <option value="">All routes</option>
            <option value="rent">Rent</option>
            <option value="sale">Buy</option>
            <option value="short_stay">Short stay</option>
            <option value="lease">Lease</option>
            <option value="commercial_lease">Commercial</option>
          </select>
          <button className="button primary" type="submit">Search</button>
        </form>

        <section className="grid" aria-label="Available listings">
          {visibleListings.map(({ listing, property }) => (
            <article className="card property-card" key={listing.id}>
              <div className="property-meta">
                <span>{property.district ? `${property.district}, ` : ""}{property.city}</span>
                <span>{label(listing.verification_state)}</span>
              </div>
              <h2>{listing.headline}</h2>
              <p>{listing.description}</p>
              <strong>{money.format(listing.price_minor / 100)} / {listing.billing_frequency ?? "route"}</strong>
              <div className="actions">
                <Link className="button primary" href={`/properties/${property.slug}`}>View property</Link>
                <button className="button" type="button" aria-label={`Save ${listing.headline}`}>Save</button>
              </div>
            </article>
          ))}
        </section>

        {visibleListings.length === 0 && (
          <section className="card">
            <div className="eyebrow">No matching published records</div>
            <h2>BUNK is ready for real property intake.</h2>
            <p>New properties enter through the governed intake and verification route before publication.</p>
            <div className="actions">
              <Link className="button primary" href="/partner/properties/new">Register property</Link>
              <Link className="button" href="/onboarding/role">Choose operating role</Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
