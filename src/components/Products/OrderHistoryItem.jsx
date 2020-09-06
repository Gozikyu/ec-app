import React from "react";
import { TextDetail } from "../UIkit/index";
import Divider from "@material-ui/core/Divider";
import { OrderedProducts } from "./index";

const datetimeToString = (data) => {
  return (
    data.getFullYear() +
    "-" +
    ("00" + (data.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + data.getDate()).slice(-2) +
    " " +
    ("00" + data.getHours()).slice(-2) +
    ":" +
    ("00" + data.getMinutes()).slice(-2) +
    ":" +
    ("00" + data.getSeconds()).slice(-2)
  );
};

const dateToString = (data) => {
  return (
    data.getFullYear() +
    "-" +
    ("00" + (data.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + data.getDate()).slice(-2)
  );
};

const OrderHistoryItem = (props) => {
  const orderedDatetime = datetimeToString(props.order.updated_at.toDate());
  const shippingDate = dateToString(props.order.shippingDate.toDate());
  const price = "￥" + props.order.amount.toLocaleString();

  return (
    <div>
      <div>
        <TextDetail label={"ID"} value={props.order.id} />
        <TextDetail label={"注文日"} value={orderedDatetime} />
        <TextDetail label={"発送予定日"} value={shippingDate} />
        <TextDetail label={"注文金額"} value={price} />

        {props.order.products.map((product) => (
          <OrderedProducts product={product} key={product.id} />
        ))}
      </div>
      <div className="module-spacer--extra-extra-small" />
      <Divider />
      <div className="module-spacer--extra-extra-small" />
    </div>
  );
};

export default OrderHistoryItem;
