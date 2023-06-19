import { MDBBtn, MDBCol, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import React from "react";

export default function SearchForm(props) {
  const search = (e) => {
    e.preventDefault();
    props.setOffset(0);
    props.setLoadMore(false);
    props.setSearch(!props.search);
  };

  return (
    <MDBRow className="d-flex justify-content-center">
      <MDBCol md="6">
        <form className="input-group pt-3" onSubmit={search}>
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => props.setQuery(e.target.value)}
          />
          <MDBBtn color="primary" type="submit">
            <MDBIcon fas icon="search" />
          </MDBBtn>
        </form>
      </MDBCol>
    </MDBRow>
  );
}
