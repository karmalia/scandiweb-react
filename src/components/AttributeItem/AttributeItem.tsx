import React, { Component } from "react";
import { AttributeItemType } from "../../types";
import { twMerge } from "tailwind-merge";
//Dinamik olarak db den alınabilir

interface AttributeItemProps {
  isSelected: boolean;
  attributeId: string;
  item: AttributeItemType;
  attributeType: string;
  handleAttributeSelection?: (attributeId: string, itemId: string) => void;
  className?: string;
}

type State = {};

class AttributeItemText extends Component<AttributeItemProps, State> {
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

class AttributeItemSwatch extends Component<AttributeItemProps, State> {
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

const AttributeItemLookUp = {
  text: AttributeItemText,
  swatch: AttributeItemSwatch,
};

export default class AttributeItem extends Component<
  AttributeItemProps,
  State
> {
  state = {};

  render() {
    const AttributeItemComponent =
      AttributeItemLookUp[this.props.attributeType] ||
      (() => <div>No Attribute</div>)();

    return <AttributeItemComponent {...this.props} />;
  }
}
