import { Product } from "../types";

function checkIfAllAttributesSelected(attributes: Product["attributes"]) {
  return attributes.every((attribute) =>
    attribute.items.some((item) => item.isSelected)
  );
}

export default checkIfAllAttributesSelected;
