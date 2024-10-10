export default function getAttributeItemTypeClassName(
  attributeItemType: "text" | "swatch"
): string {
  switch (attributeItemType) {
    case "text":
      return "w-16 text-sm text-center grid place-content-center";
    case "swatch":
      return "w-6 h-6";
    default:
      return "";
      break;
  }
}
