import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Loading from "../components/Loading";
import TYPE from "../fun-redux/actions";
import { useToken } from "../hooks/useToken";
import { Home } from "../routes/urls";

export default function SignIn() {
  const [token, setToken] = useToken();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { loading } = useSelector((store) => {
    return store.authReducer;
  });

  const dispatch = useDispatch();
  const doSignIn = (e) => {
    e.preventDefault();
    dispatch({
      type: TYPE.SIGN_IN_REQUESTING,
      data: {
        username: username,
        password: password,
      },
      setToken: setToken,
    });
  };

  if (token) return <Navigate to={Home} />;

  return (
    <>
      <div className="mt-4 d-flex align-items-center justify-content-center">
        <form className="form-outline w-25" onSubmit={doSignIn}>
          <MDBInput
            className="mb-4"
            type="text"
            id="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            maxLength={255}
            required
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            maxLength={255}
            required
          />

          <MDBBtn type="submit" block>
            Sign in
          </MDBBtn>
        </form>
      </div>
      {loading && <Loading />}
    </>
  );
}
