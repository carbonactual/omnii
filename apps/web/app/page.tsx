const routes = [
  ["Rent", "Verified homes and commercial spaces"],
  ["Buy", "Land, houses, shops, offices and developments"],
  ["Shortlet", "Serviced stays with clear terms"],
  ["Invest", "Governed property opportunities"],
  ["List", "Create a property record and prove authority"],
  ["Wanted", "Describe your need and let BUNK match supply"]
];

export default function Page() {
  return (
    <main>
      <div className="shell">
        <section className="hero">
          <div className="eyebrow">Carbon Actual · Property route</div>
          <h1>BUNK</h1>
          <p>Property, properly connected. Find, verify, occupy, manage, improve, and build value from real property activity.</p>
          <div className="actions">
            <a className="button primary" href="/discover">Where do you want to bunk?</a>
            <a className="button" href="/partner/properties/new">List property</a>
            <a className="button" href="/abba">Ask ABBA</a>
          </div>
        </section>
        <section className="grid" aria-label="BUNK routes">
          {routes.map(([title, copy]) => (
            <a className="card" href={`/${title.toLowerCase()}`} key={title}>
              <h2>{title}</h2><p>{copy}</p>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
