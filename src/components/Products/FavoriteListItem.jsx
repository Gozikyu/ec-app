import React from "react";
import { useSelector } from "react-redux";
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
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

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
      {/* <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="お気に入り商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={props.product.name}
            secondary={"サイズ：" + props.product.size}
          />
          <ListItemText primary={"￥" + props.product.price.toLocaleString()} />
        </div>

        <IconButton
          onClick={() => removeProductFromFavorite(props.product.favoriteId)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider /> */}
    </>
  );
};

export default CartListItem;
