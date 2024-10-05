import React, { Component } from "react";
import { AttributeItemType } from "../../types";
//Dinamik olarak db den alınabilir
interface AttributeItemProps {
  isActive?: boolean;
  item: AttributeItemType;
  attributeType: string;
}

type State = {};

class AttributeItemText extends Component<AttributeItemProps, State> {
  render() {
    return (
      <div
        className={`${
          this.props.isActive ? "bg-black text-white" : "bg-white text-black"
        } border-black border w-[100px] text-center font-roboto`}
      >
        {this.props.item.displayValue}
      </div>
    );
  }
}

class AttributeItemSwatch extends Component<AttributeItemProps, State> {
  render() {
    return <div>AttributeItemSwatch</div>;
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
