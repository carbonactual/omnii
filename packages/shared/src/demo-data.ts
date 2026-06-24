import type { ListingInput, PropertyInput } from "./domain";

export const demoProperties: PropertyInput[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    publicReference: "BUNK-PROP-000001",
    slug: "wuse-2-two-bedroom-apartment",
    name: "Wuse 2 Two-Bedroom Apartment",
    propertyType: "apartment",
    description: "A fictional verified two-bedroom apartment for the Abuja pilot with reliable utilities, secure access, and proximity to offices and services.",
    countryCode: "NG",
    state: "Federal Capital Territory",
    city: "Abuja",
    district: "Wuse 2",
    neighbourhood: "Wuse",
    latitude: 9.0765,
    longitude: 7.3986,
    verificationState: "verified",
    occupancyState: "vacant",
    riskState: "low",
    publicVisibility: true,
    rootReference: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa"
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    publicReference: "BUNK-PROP-000002",
    slug: "gwarinpa-family-duplex",
    name: "Gwarinpa Family Duplex",
    propertyType: "duplex",
    description: "A fictional four-bedroom duplex with parking, family-oriented layout, and a documented inspection history for the BUNK pilot.",
    countryCode: "NG",
    state: "Federal Capital Territory",
    city: "Abuja",
    district: "Gwarinpa",
    latitude: 9.1099,
    longitude: 7.4042,
    verificationState: "partially_verified",
    occupancyState: "inspection_pending",
    riskState: "moderate",
    publicVisibility: true,
    rootReference: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb"
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    publicReference: "BUNK-PROP-000003",
    slug: "jabi-serviced-studio",
    name: "Jabi Serviced Studio",
    propertyType: "serviced_apartment",
    description: "A fictional furnished serviced studio near Jabi Lake with weekly and monthly stay options and clearly stated fees.",
    countryCode: "NG",
    state: "Federal Capital Territory",
    city: "Abuja",
    district: "Jabi",
    latitude: 9.0647,
    longitude: 7.4237,
    verificationState: "verified",
    occupancyState: "vacant",
    riskState: "low",
    publicVisibility: true,
    rootReference: "cccccccc-cccc-4ccc-8ccc-cccccccccccc"
  }
];

export const demoListings: ListingInput[] = [
  {
    id: "44444444-4444-4444-8444-444444444444",
    publicReference: "BUNK-LIST-000001",
    propertyId: demoProperties[0].id,
    listingType: "rent",
    headline: "Verified two-bedroom apartment in Wuse 2",
    description: "Annual rental route with a documented inspection, clear move-in costs, and a human-reviewed authority-to-list record.",
    priceMinor: 380000000,
    currency: "NGN",
    billingFrequency: "yearly",
    status: "published",
    verificationState: "verified",
    authorityProofId: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
    sealDecisionId: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee"
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    publicReference: "BUNK-LIST-000002",
    propertyId: demoProperties[1].id,
    listingType: "rent",
    headline: "Four-bedroom family duplex in Gwarinpa",
    description: "A spacious family home currently awaiting final document verification before full marketplace confidence is granted.",
    priceMinor: 520000000,
    currency: "NGN",
    billingFrequency: "yearly",
    status: "published",
    verificationState: "partially_verified"
  },
  {
    id: "66666666-6666-4666-8666-666666666666",
    publicReference: "BUNK-LIST-000003",
    propertyId: demoProperties[2].id,
    listingType: "shortlet",
    headline: "Serviced studio near Jabi Lake",
    description: "A flexible furnished stay with transparent cleaning, service, and deposit terms for weekly or monthly bookings.",
    priceMinor: 12000000,
    currency: "NGN",
    billingFrequency: "weekly",
    status: "published",
    verificationState: "verified",
    authorityProofId: "ffffffff-ffff-4fff-8fff-ffffffffffff",
    sealDecisionId: "99999999-9999-4999-8999-999999999999"
  }
];
