"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function NewPropertyPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("Sign in before registering a property.");
      setSaving(false);
      return;
    }

    const name = String(form.get("name") ?? "").trim();
    const propertyType = String(form.get("property_type") ?? "").trim();
    const state = String(form.get("state") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const publicReference = `BUNK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const slug = `${slugify(name)}-${crypto.randomUUID().slice(0, 6)}`;

    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .insert({
        public_reference: publicReference,
        slug,
        name,
        property_type: propertyType,
        description,
        state,
        city,
        created_by: user.id,
        updated_by: user.id,
        public_visibility: false
      })
      .select("id,slug")
      .single();

    if (propertyError || !property) {
      setError(propertyError?.message ?? "Property registration failed.");
      setSaving(false);
      return;
    }

    const { error: formError } = await supabase.from("omnii_form_submissions").insert({
      id: crypto.randomUUID(),
      template_id: "BUNK:PROPERTY_INTAKE",
      subject_id: property.id,
      requester_id: user.id,
      status: "submitted",
      submitted_at: new Date().toISOString(),
      payload: { name, property_type: propertyType, state, city, description },
      authority: { requestedBy: user.id, humanApprovalRequired: true },
      provenance: { root: "OMNII", product: "BUNK", form: "BUNK:PROPERTY_INTAKE" },
      evidence: { required: true, refs: [] }
    });

    if (formError) {
      setError(`Property created, but the intake submission could not be recorded: ${formError.message}`);
      setSaving(false);
      return;
    }

    router.push(`/properties/${property.slug}`);
  }

  return (
    <main>
      <div className="shell">
        <section className="hero compact">
          <div className="eyebrow">BUNK · Property Intake</div>
          <h1>Register property properly.</h1>
          <p>Create the property record first. Publication, verification and authority remain separate governed steps.</p>
        </section>

        <form className="card" onSubmit={submit}>
          <label>Property name<input name="name" required placeholder="Example: Family Residence, Wuse 2" /></label>
          <label>Property type<input name="property_type" required placeholder="residential, commercial, land, development…" /></label>
          <div className="grid">
            <label>State<input name="state" required placeholder="FCT" /></label>
            <label>City<input name="city" required placeholder="Abuja" /></label>
          </div>
          <label>Description<textarea name="description" required rows={6} placeholder="Describe what is being registered, including anything relevant to identity or access." /></label>

          {error && <p role="alert">{error}</p>}

          <div className="actions">
            <button className="button primary" disabled={saving} type="submit">{saving ? "Registering…" : "Register property"}</button>
            <a className="button" href="/discover">Cancel</a>
          </div>
        </form>
      </div>
    </main>
  );
}
