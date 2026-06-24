import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main>
      <div className="shell">
        <section className="hero compact">
          <div className="eyebrow">Account recovery</div>
          <h1>Reset access</h1>
          <p>Enter the verified email address connected to your BUNK account.</p>
        </section>
        <form className="card auth-form" action="/api/v1/auth/password/reset" method="post">
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <button className="button primary" type="submit">Send recovery link</button>
          <Link href="/sign-in">Back to sign in</Link>
        </form>
      </div>
    </main>
  );
}
