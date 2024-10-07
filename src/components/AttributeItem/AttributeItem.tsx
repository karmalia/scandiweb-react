import React, { Component } from "react";
import { AttributeItemType } from "../../types";
//Dinamik olarak db den alınabilir
interface AttributeItemProps {
  isSelected: boolean;
  attributeId: string;
  item: AttributeItemType;
  attributeType: string;
  handleAttributeSelection: (attributeId: string, itemId: string) => void;
}

type State = {};

class AttributeItemText extends Component<AttributeItemProps, State> {
  render() {
    const { item, attributeId } = this.props;
    const { displayValue, value, id, isSelected } = item;
    return (
      <div
        className={`${
          isSelected ? "bg-black text-white" : "bg-white text-black"
        } border-black border w-[100px] text-center font-roboto cursor-pointer`}
        onClick={() => this.props.handleAttributeSelection(attributeId, id)}
      >
        {displayValue}
      </div>
    );
  }
}

class AttributeItemSwatch extends Component<AttributeItemProps, State> {
  render() {
    const { item, attributeId } = this.props;
    const { displayValue, value, id, isSelected } = item;
    return (
      <div
        className={`${
          isSelected ? "bg-black text-white" : "bg-white text-black"
        } border border-black w-8 h-8 inline-block`}
        style={{ backgroundColor: value }}
        onClick={() => this.props.handleAttributeSelection(attributeId, id)}
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
