import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import TYPE from "../fun-redux/actions";
import { Login } from "../routes/urls";

export default function Signup() {
  const [formValue, setFormValue] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    rePassword: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.id]: e.target.value });
  };

  const { loading, success } = useSelector((store) => {
    return store.authReducer;
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (formValue.password !== formValue.rePassword) {
      alert("The password confirmation does not match");
    } else {
      dispatch({
        type: TYPE.SIGN_UP_REQUESTING,
        data: formValue,
      });
    }
  };

  if (success) return <Navigate to={Login} />;
  return (
    <>
      <div className="mt-4 d-flex align-items-center justify-content-center">
        <form className="form-outline w-25" onSubmit={onSubmit}>
          <MDBInput
            className="mb-4"
            type="text"
            id="username"
            label="Username"
            onChange={onChange}
            value={formValue.username}
            maxLength={255}
            required
          />
          <MDBInput
            className="mb-4"
            type="text"
            id="first_name"
            label="First Name"
            onChange={onChange}
            value={formValue.first_name}
            maxLength={255}
            required
          />
          <MDBInput
            className="mb-4"
            type="text"
            id="last_name"
            label="Last Name"
            onChange={onChange}
            value={formValue.last_name}
            maxLength={255}
            required
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="password"
            label="Password"
            onChange={onChange}
            value={formValue.password}
            maxLength={255}
            required
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="rePassword"
            label="Re-enter Password"
            onChange={onChange}
            value={formValue.rePassword}
            maxLength={255}
            required
          />
          <MDBBtn type="submit" block>
            Sign up
          </MDBBtn>
        </form>
      </div>
      {loading && <Loading />}
    </>
  );
}
