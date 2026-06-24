import Link from "next/link";
import { demoListings, demoProperties } from "@/packages/shared/src/demo-data";

const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0
});

export default function DiscoverPage() {
  const listings = demoListings
    .filter((listing) => listing.status === "published")
    .map((listing) => ({
      ...listing,
      property: demoProperties.find((property) => property.id === listing.propertyId)
    }));

  return (
    <main>
      <div className="shell">
        <header className="hero compact">
          <div className="eyebrow">Discover · Abuja pilot</div>
          <h1>Find property with the truth attached.</h1>
          <p>Search homes, commercial spaces, land, and short stays with visible verification state, fees, and next actions.</p>
        </header>

        <form className="searchbar" action="/discover" role="search">
          <input aria-label="Search location or property" name="q" placeholder="Wuse 2, Jabi, two-bedroom, shortlet…" />
          <select aria-label="Property route" name="type" defaultValue="">
            <option value="">All routes</option>
            <option value="rent">Rent</option>
            <option value="sale">Buy</option>
            <option value="shortlet">Shortlet</option>
            <option value="commercial_lease">Commercial</option>
          </select>
          <button className="button primary" type="submit">Search</button>
        </form>

        <section className="grid" aria-label="Available listings">
          {listings.map((listing) => {
            const property = listing.property;
            if (!property) return null;
            return (
              <article className="card property-card" key={listing.id}>
                <div className="property-meta">
                  <span>{property.district}, {property.city}</span>
                  <span>{listing.verificationState.replaceAll("_", " ")}</span>
                </div>
                <h2>{listing.headline}</h2>
                <p>{listing.description}</p>
                <strong>{money.format(listing.priceMinor / 100)} / {listing.billingFrequency ?? "route"}</strong>
                <div className="actions">
                  <Link className="button primary" href={`/properties/${property.slug}`}>View property</Link>
                  <button className="button" type="button" aria-label={`Save ${listing.headline}`}>Save</button>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
