import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/UIkit/index";
import { useDispatch } from "react-redux";
import { resetPassword } from "../reducks/users/operations";
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        rows={1}
        required={true}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />

      <div className="module-spacer--medium" />

      <div className="center">
        <PrimaryButton
          label={"RESET PASSWORD"}
          onClick={() => dispatch(resetPassword(email))}
        />
        <div className="help">
          {" "}
          <p onClick={() => dispatch(push("/signin"))}>ログイン画面に戻る</p>
        </div>
      </div>
    </div>
  );
};

export default Reset;
