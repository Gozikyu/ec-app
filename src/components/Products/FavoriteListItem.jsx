import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { db } from "../../firebase/index";
import { getUserId } from "../../reducks/users/selectors";
import { getProducts } from "../../reducks/products/selectors";
import { fetchProducts } from "../../reducks/products/operations";

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
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const uid = getUserId(selector);
  const products = getProducts(selector);
  const productId = props.product.productId;

  let quantity = "";
  if (products.length > 0) {
    const product = products.filter((product) => product.id == productId);
    const productSize = props.product.size;
    quantity = product[0].sizes.filter((size) => size.size == productSize)[0]
      .quantity;
  }

  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? query.split("?gender=")[1] : "";
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
  }, [query]);

  const removeProductFromFavorite = (id) => {
    console.log(id);
    return db
      .collection("users")
      .doc(uid)
      .collection("favorite")
      .doc(id)
      .delete();
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
          <img className={classes.image} src={image} alt="お気に入り商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={props.product.name}
            secondary={"サイズ：" + props.product.size}
          />
          <ListItemText primary={"￥" + props.product.price.toLocaleString()} />

          <ListItemText primary={"残り" + quantity + "個"} />
        </div>

        <IconButton
          onClick={() => removeProductFromFavorite(props.product.favoriteId)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
