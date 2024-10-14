import { Component, PureComponent } from "react";
import { AttributeItemProps } from "../types";
import { twMerge } from "tailwind-merge";

class AttributeItemSwatch extends PureComponent<AttributeItemProps> {
  render() {
    const { item, attributeId, handleAttributeSelection, className } =
      this.props;
    const { value, id, isSelected } = item;
    return (
      <div
        className={twMerge(
          `w-8 h-8 ${
            isSelected
              ? "outline outline-scandiGreen outline-offset-1 outline-2"
              : ""
          } ${handleAttributeSelection && "cursor-pointer"}`,
          className && className
        )}
        style={{
          backgroundColor: value,
        }}
        onClick={() =>
          handleAttributeSelection && handleAttributeSelection(attributeId, id)
        }
        data-testid={`product-attribute-${attributeId}-${value}${
          isSelected ? "-selected" : ""
        }`}
      />
    );
  }
}

export default AttributeItemSwatch;
