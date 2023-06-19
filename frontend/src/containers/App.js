import { MDBContainer } from "mdb-react-ui-kit";
import { useState } from "react";
import SearchForm from "../components/SearchForm";
import ReviewList from "./ReviewList";

export default function App() {
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [search, setSearch] = useState(false);
  const props = {
    query: query,
    setQuery: setQuery,
    offset: offset,
    setOffset: setOffset,
    loadMore: loadMore,
    setLoadMore: setLoadMore,
    search: search,
    setSearch: setSearch,
  };
  return (
    <MDBContainer>
      <SearchForm {...props} />
      <hr className="hr" />
      <ReviewList {...props} />
    </MDBContainer>
  );
}
