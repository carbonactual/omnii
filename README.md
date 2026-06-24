# BUNK

Property, properly connected.

BUNK is the property and housing route of the Carbon Actual ecosystem. It combines property discovery, verified listings, property operations, tenancy, inspections, agreements, payments, maintenance, agent workflows, proof, and AI-assisted matching.

## Current build

This repository is now the active BUNK product repository.

Initial vertical slice:

1. Property registry
2. Unit registry
3. Listing creation
4. Verification submission
5. Human review
6. Listing publication
7. Public search
8. Inspection booking
9. Proof and Pulse events

## Architecture

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Zod validation
- HAPI adapter for shared identity, SEAL, Actual, Becoming, and Pulse

## Product boundaries

BUNK owns property, listing, inspection, tenancy, maintenance, finance references, CRM, and property operations.

HAPI supplies shared human identity, consent, context, continuity, and event return through a versioned adapter.

## Status

Foundation implementation in progress.
