import { Product } from "../types";

function getUniqueId(product: Product, useDefault?: boolean): string {
  return product.attributes
    .map(
      (attr) =>
        `${product.id}-${attr.name}-${
          useDefault
            ? attr.items[0].id
            : attr.items.find((item) => item.isSelected)?.id
        }`
    )
    .join("-");
}

export default getUniqueId;
