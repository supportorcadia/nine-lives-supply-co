// Thin client for the Shopify Storefront API. No SDK: one fetch, typed.
// The store domain and token come from the Vercel Shopify integration (see .env.local
// locally; set on the Vercel project in production).

const API_VERSION = "2025-07";

function config() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) throw new Error("Shopify is not configured: SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN are needed.");
  return { endpoint: `https://${domain}/api/${API_VERSION}/graphql.json`, token };
}

export const shopifyConfigured = () => Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  init: { cache?: RequestCache; revalidate?: number; tags?: string[] } = {},
): Promise<T> {
  const { endpoint, token } = config();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query, variables }),
    cache: init.cache,
    next: init.revalidate !== undefined || init.tags ? { revalidate: init.revalidate, tags: init.tags } : undefined,
  });
  if (!res.ok) throw new Error(`Shopify responded ${res.status}`);
  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  if (!json.data) throw new Error("Shopify returned no data");
  return json.data;
}
