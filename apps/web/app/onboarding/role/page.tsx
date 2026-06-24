import { bunkRoles, privilegedRoles } from "@/packages/auth/src/types";

export default function RoleSetupPage() {
  const selectable = bunkRoles.filter((role) => !privilegedRoles.includes(role));
  return (
    <main>
      <div className="shell">
        <section className="hero compact">
          <div className="eyebrow">Active context</div>
          <h1>What are you doing in BUNK now?</h1>
          <p>Your account can hold several roles. Choose the one that controls the current dashboard and permissions.</p>
        </section>
        <form className="grid" action="/api/v1/me/active-role" method="post">
          {selectable.map((role) => (
            <label className="card" key={role}>
              <input type="radio" name="role" value={role} required />
              <h2>{role.replaceAll("_", " ")}</h2>
              <p>Use BUNK in this role. Other assigned roles remain available.</p>
            </label>
          ))}
          <button className="button primary" type="submit">Continue</button>
        </form>
      </div>
    </main>
  );
}
