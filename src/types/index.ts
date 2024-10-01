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

interface AttributeItem {
  id: string; // E.g., "1", "7"
  value: string; // E.g., "1T", "#000000"
  displayValue: string; // E.g., "1TB", "Black"
  __typename: string;
}

interface Attribute {
  name: string; // Attribute name, e.g., "Capacity"
  type: string; // Type of attribute, e.g., "text", "swatch"
  items: AttributeItem[]; // Array of items within this attribute
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
