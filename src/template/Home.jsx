import React from "react";
import { useDispatch } from "react-redux";
import { getUserId } from "../reducks/users/selectors";
import { getUsername } from "../reducks/users/selectors";
import { useSelector } from "react-redux";
import { signOutAction } from "../reducks/users/actions";
import { signOut } from "../reducks/users/operations";

const Home = () => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>HOME</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザーネーム：{username}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};
export default Home;
