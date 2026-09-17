// Storefront API operations. Products carry the same handles as lib/catalogue.ts slugs,
// so the shop can marry Shopify's prices, variants and stock to the site's own copy.

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        handle
        title
        availableForSale
        variants(first: 50) {
          nodes {
            id
            sku
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

export const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        attributes { key value }
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            sku
            price { amount currencyCode }
            selectedOptions { name value }
            product { handle title }
          }
        }
      }
    }
  }
`;

export const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_ADD = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_UPDATE = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_REMOVE = /* GraphQL */ `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_QUERY = /* GraphQL */ `
  query Cart($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
  ${CART_FRAGMENT}
`;

export type Money = { amount: string; currencyCode: string };
export type SelectedOption = { name: string; value: string };

export type StorefrontVariant = {
  id: string;
  sku: string | null;
  availableForSale: boolean;
  price: Money;
  selectedOptions: SelectedOption[];
};

export type StorefrontProduct = {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  variants: { nodes: StorefrontVariant[] };
};

export type CartLine = {
  id: string;
  quantity: number;
  attributes: { key: string; value: string }[];
  cost: { totalAmount: Money };
  merchandise: {
    id: string;
    title: string;
    sku: string | null;
    price: Money;
    selectedOptions: SelectedOption[];
    product: { handle: string; title: string };
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money; totalAmount: Money };
  lines: { nodes: CartLine[] };
};
