import Link from "next/link";
import { bunkRoles } from "@/packages/auth/src/types";

export default function SignUpPage() {
  return (
    <main>
      <div className="shell">
        <section className="hero compact">
          <div className="eyebrow">Join BUNK</div>
          <h1>Create your property route.</h1>
          <p>Start with only the identity and role needed for your current task. More information is requested progressively.</p>
        </section>
        <form className="card auth-form" action="/api/v1/auth/register" method="post">
          <label>Full name<input name="displayName" autoComplete="name" required minLength={2} /></label>
          <label>Email<input name="email" type="email" autoComplete="email" /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
          <label>Password<input name="password" type="password" autoComplete="new-password" required minLength={10} /></label>
          <label>
            What are you here to do?
            <select name="role" defaultValue="property_seeker">
              {bunkRoles.filter((role) => !["super_admin","product_owner","auditor","verification_officer","compliance_officer","finance_officer","operations_manager","seal_approver"].includes(role)).map((role) => (
                <option key={role} value={role}>{role.replaceAll("_", " ")}</option>
              ))}
            </select>
          </label>
          <label className="inline-control"><input name="acceptedTerms" type="checkbox" value="true" required />I accept the BUNK terms.</label>
          <label className="inline-control"><input name="acceptedPrivacy" type="checkbox" value="true" required />I accept the privacy notice.</label>
          <button className="button primary" type="submit">Create account</button>
          <p>Already registered? <Link href="/sign-in">Sign in</Link>.</p>
        </form>
      </div>
    </main>
  );
}
