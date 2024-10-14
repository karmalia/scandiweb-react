import { AttributeItemType } from "../../types";

export interface AttributeItemProps {
  isSelected: boolean;
  attributeId: string;
  item: AttributeItemType;
  attributeType: string;
  handleAttributeSelection?: (attributeId: string, itemId: string) => void;
  className?: string;
}
