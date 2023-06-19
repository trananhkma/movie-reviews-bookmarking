import {
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "../fun-redux/actions";
import { Bookmarks, Home, Login, SignUp } from "../routes/urls";

export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false);

  const { username } = useSelector((store) => {
    return store.authReducer;
  });

  const dispatch = useDispatch();
  const doSignOut = () => {
    dispatch({ type: TYPE.SIGN_OUT });
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light" className="sticky-top">
      <MDBContainer>
        <MDBNavbarBrand href={Home}>Movie Review Collection</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon fas icon="bars" />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto">
            {username && (
              <MDBNavbarItem>
                <MDBNavbarLink active href={Bookmarks}>
                  Bookmarks
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <div className="d-flex align-items-center text-nowrap">
            {username ? (
              <>
                {" "}
                Hi {username}!
                <MDBBtn
                  color="tertiary"
                  className="px-3 mx-2"
                  onClick={doSignOut}
                >
                  Sign out
                </MDBBtn>
              </>
            ) : (
              <>
                <MDBBtn href={Login} color="tertiary" className="px-3 mx-2">
                  Sign in
                </MDBBtn>
                <MDBBtn
                  href={SignUp}
                  outline
                  color="secondary"
                  className="px-3 mx-2"
                >
                  Sign up
                </MDBBtn>
              </>
            )}
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
