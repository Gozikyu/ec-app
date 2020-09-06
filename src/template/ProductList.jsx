import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/Products/index";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";
import { getIsSignedIn } from "../reducks/users/selectors";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const isSignedIn = getIsSignedIn(selector);

  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? query.split("?gender=")[1] : "";
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
  }, [query]);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              images={product.images}
              id={product.id}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
