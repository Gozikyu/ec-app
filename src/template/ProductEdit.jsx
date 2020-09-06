import React, { useState, useCallback, useEffect } from "react";
import { TextInput, SelectBox, PrimaryButton } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { saveProducts } from "../reducks/products/operations";
import ImageArea from "../components/Products/ImageArea";
import { db } from "../firebase/index";
import SetSizeArea from "../components/Products/SetSizeArea";

const ProductEdit = (props) => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/product/edit")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [categories, setCategories] = useState([]),
    [gender, setGender] = useState(""),
    [images, setImages] = useState([]),
    [price, setPrice] = useState(""),
    [sizes, setSizes] = useState([]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const genders = [
    { id: "all", name: "全て" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "ウィメンズ" },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setImages(data.images);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
      });
  });

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          multiline={false}
          rows={1}
          required={true}
          value={name}
          label={"商品名"}
          type={"text"}
          onChange={inputName}
        />

        <TextInput
          fullWidth={true}
          multiline={true}
          rows={5}
          required={true}
          value={description}
          label={"商品説明"}
          type={"text"}
          onChange={inputDescription}
        />

        <SelectBox
          label={"カテゴリー"}
          required={true}
          value={category}
          options={categories}
          select={setCategory}
        />

        <SelectBox
          label={"性別"}
          required={true}
          value={gender}
          options={genders}
          select={setGender}
        />

        <TextInput
          fullWidth={true}
          multiline={false}
          rows={1}
          required={true}
          value={price}
          label={"価格"}
          type={"number"}
          onChange={inputPrice}
        />

        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />

        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={"商品登録"}
            onClick={() =>
              dispatch(
                saveProducts(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
