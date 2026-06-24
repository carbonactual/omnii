import { notFound } from "next/navigation";
import { demoListings, demoProperties } from "@/packages/shared/src/demo-data";

const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0
});

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = demoProperties.find((item) => item.slug === slug);
  if (!property) notFound();

  const listing = demoListings.find((item) => item.propertyId === property.id && item.status === "published");
  if (!listing) notFound();

  return (
    <main>
      <div className="shell">
        <section className="hero compact">
          <div className="eyebrow">{property.publicReference}</div>
          <h1>{property.name}</h1>
          <p>{property.description}</p>
          <div className="property-meta">
            <span>{property.district}, {property.city}</span>
            <span>{property.verificationState.replaceAll("_", " ")}</span>
            <span>{property.occupancyState.replaceAll("_", " ")}</span>
          </div>
        </section>

        <section className="grid detail-grid">
          <article className="card">
            <div className="eyebrow">Current route</div>
            <h2>{listing.headline}</h2>
            <p>{listing.description}</p>
            <strong>{money.format(listing.priceMinor / 100)} / {listing.billingFrequency ?? "route"}</strong>
          </article>

          <article className="card">
            <div className="eyebrow">Trust state</div>
            <h2>{listing.verificationState === "verified" ? "Human-reviewed verification" : "Verification still forming"}</h2>
            <p>Uploaded evidence is not treated as verified until the correct reviewer and SEAL decision are recorded.</p>
            <a className="button" href={`/api/v1/properties/${property.id}/proof`}>View proof state</a>
          </article>

          <article className="card">
            <div className="eyebrow">Next action</div>
            <h2>Inspect before you decide.</h2>
            <p>Book a physical or live-video inspection. Attendance, evidence, and outcome return to the property Pulse timeline.</p>
            <a className="button primary" href={`/inspections/new?listing=${listing.id}`}>Book inspection</a>
          </article>
        </section>
      </div>
    </main>
  );
}
