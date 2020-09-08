import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/list";
import { getProductsInFavorite } from "../reducks/users/selectors";
import { PrimaryButton, GreyButton } from "../components/UIkit/index";
import { FavoriteListItem } from "../components/Products/index";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

const CartList = () => {
  const selector = useSelector((state) => state);
  const productsInFavorite = getProductsInFavorite(selector);
  const dispatch = useDispatch();
  const classes = useStyles();

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  });

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">お気に入り商品</h2>
      <List className={classes.root}>
        {productsInFavorite.length > 0 &&
          productsInFavorite.map((product) => (
            <FavoriteListItem key={product.favoriteId} product={product} />
          ))}
      </List>
      <div className="module-spacer--medium " />
      <div>
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
        <div className="module-spacer--extra-small" />
        <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
