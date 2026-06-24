import Link from "next/link";

export default function SignInPage() {
  return (
    <main>
      <div className="shell">
        <section className="hero compact">
          <div className="eyebrow">BUNK account</div>
          <h1>Sign in</h1>
          <p>Continue with the role and property context already connected to your account.</p>
        </section>
        <form className="card auth-form" action="/api/v1/auth/login" method="post">
          <label>
            Email or phone
            <input name="identifier" autoComplete="username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <label className="inline-control">
            <input name="rememberDevice" type="checkbox" />
            Trust this device
          </label>
          <button className="button primary" type="submit">Sign in</button>
          <div className="actions">
            <Link href="/forgot-password">Forgot password</Link>
            <Link href="/sign-up">Create account</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
