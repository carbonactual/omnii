import { foundationSessionSchema, type FoundationSession } from "./contracts";

export class FoundationClient {
  constructor(private readonly baseUrl: string, private readonly productKey: string) {}

  async resolveSession(accessToken: string): Promise<FoundationSession> {
    const response = await fetch(`${this.baseUrl}/api/v1/foundation/session`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        "x-product-key": this.productKey,
        "x-product": "BUNK"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Foundation session resolution failed: ${response.status}`);
    }

    return foundationSessionSchema.parse(await response.json());
  }
}
