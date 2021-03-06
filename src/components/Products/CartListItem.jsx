import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { db } from "../../firebase/index";
import { getUserId } from "../../reducks/users/selectors";

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
  },
  text: {
    width: "100%",
  },
});

const CartListItem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const productId = props.product.productId;

  const removeProductFromCart = (id) => {
    return db.collection("users").doc(uid).collection("cart").doc(id).delete();
  };

  const image = props.product.images[0].path;
  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar
          onClick={() =>
            dispatch(push("/product/" + productId + "/information"))
          }
        >
          <img className={classes.image} src={image} alt="カート商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={props.product.name}
            secondary={"サイズ：" + props.product.size}
          />
          <ListItemText primary={"￥" + props.product.price.toLocaleString()} />
        </div>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
