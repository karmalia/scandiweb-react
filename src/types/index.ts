export interface ProductToAdd {
  productId: string;
  attributeId: string | null;
  attributeItemId: string | null;
}

export interface Category {
  id: string;
  name: string;
  __typename: string;
}

interface Currency {
  label: string;
  symbol: string;
  __typename: string;
}

interface Price {
  amount: number;
  currency: Currency;
  __typename: string;
}

export interface AttributeItemType {
  id: string;
  isSelected?: boolean;
  value: string;
  displayValue: string;
  __typename: string;
}

interface Attribute {
  id: string;
  name: string;
  type: "text" | "swatch";
  items: AttributeItemType[];
  __typename: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  in_stock: boolean;
  brand: string;
  prices: Price[];
  gallery: string[];
  category: string;
  attributes: Attribute[];
  __typename: string;
}
