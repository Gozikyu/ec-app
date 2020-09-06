import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/list";
import { getProductsInCart } from "../reducks/users/selectors";
import { PrimaryButton, GreyButton } from "../components/UIkit/index";
import { CartListItem } from "../components/Products/index";
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
  const productsInCart = getProductsInCart(selector);
  console.log(productsInCart);
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
      <h2 className="u-text__headline">ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => (
            <CartListItem key={product.cartId} product={product} />
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
