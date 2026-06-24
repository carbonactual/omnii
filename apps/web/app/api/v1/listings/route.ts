import { NextRequest, NextResponse } from "next/server";
import { demoListings, demoProperties } from "@/packages/shared/src/demo-data";

function formatListing(listing: (typeof demoListings)[number]) {
  const property = demoProperties.find((item) => item.id === listing.propertyId);
  return {
    ...listing,
    price: listing.priceMinor / 100,
    property,
    feesDisclosed: true,
    verificationLabel:
      listing.verificationState === "verified"
        ? "Human-reviewed verification"
        : listing.verificationState.replaceAll("_", " ")
  };
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const city = params.get("city")?.toLowerCase();
  const district = params.get("district")?.toLowerCase();
  const type = params.get("type");
  const verifiedOnly = params.get("verified") === "true";
  const maximumPrice = Number(params.get("maxPrice") ?? Number.MAX_SAFE_INTEGER);

  const results = demoListings
    .filter((listing) => listing.status === "published")
    .map(formatListing)
    .filter(({ listingType, verificationState, price, property }) => {
      if (!property) return false;
      if (city && property.city.toLowerCase() !== city) return false;
      if (district && property.district?.toLowerCase() !== district) return false;
      if (type && listingType !== type) return false;
      if (verifiedOnly && verificationState !== "verified") return false;
      if (price > maximumPrice) return false;
      return true;
    });

  return NextResponse.json({
    data: results,
    meta: {
      count: results.length,
      currency: "NGN",
      generatedAt: new Date().toISOString()
    }
  });
}
