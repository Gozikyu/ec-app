import React, { useCallback } from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import { PrimaryButton } from "../UIkit";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  list: {
    backgroundColor: "#fff",
    height: "auto",
  },
  image: {
    objectFit: "cover",
    margin: "8px 16px 8px 0",
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

const OrderedProducts = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const moveToProductDetail = useCallback((id) => {
    dispatch(push("/product/" + id + "/infomation"));
  }, []);

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar className={classes.image}>
          <img src={props.product.images[0].path} alt="注文商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={props.product.name}
            secondary={"サイズ：" + props.product.size}
          />
          <ListItemText primary={"￥" + props.product.price.toLocaleString()} />
        </div>
        <PrimaryButton
          label={"商品情報"}
          onClick={() => moveToProductDetail(props.product.id)}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default OrderedProducts;
