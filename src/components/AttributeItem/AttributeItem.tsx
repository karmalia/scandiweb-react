import { PureComponent } from "react";
import AttributeItemText from "./AttributeItemText/AttributeItemText";
import AttributeItemSwatch from "./AttributeItemSwatch/AttributeItemSwatch";
import { AttributeItemProps } from "./types";

const AttributeItemLookUp = {
  text: AttributeItemText,
  swatch: AttributeItemSwatch,
};

export default class AttributeItem extends PureComponent<AttributeItemProps> {
  render() {
    const AttributeItemComponent =
      AttributeItemLookUp[this.props.attributeType];

    return <AttributeItemComponent {...this.props} />;
  }
}
