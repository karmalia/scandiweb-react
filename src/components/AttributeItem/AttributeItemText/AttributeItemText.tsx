import { Component, PureComponent } from "react";
import { AttributeItemProps } from "../types";
import { twMerge } from "tailwind-merge";

class AttributeItemText extends PureComponent<AttributeItemProps> {
  render() {
    const { item, attributeId, handleAttributeSelection, className } =
      this.props;
    const { displayValue, id, isSelected, value } = item;
    return (
      <div
        className={twMerge(
          `${isSelected ? "bg-black text-white" : "bg-white text-black"} ${
            handleAttributeSelection && "cursor-pointer"
          } border-black border w-[80px] text-center font-roboto grid place-items-center`,
          className && className
        )}
        onClick={() =>
          handleAttributeSelection && handleAttributeSelection(attributeId, id)
        }
        data-testid={`product-attribute-${attributeId}-${value}${
          isSelected ? "-selected" : ""
        }`}
      >
        {displayValue}
      </div>
    );
  }
}

export default AttributeItemText;
