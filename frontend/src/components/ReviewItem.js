import { MDBBtn, MDBCol, MDBIcon, MDBRipple, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "../fun-redux/actions";

export default function ReviewItem({ review, states }) {
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const { createdReview, deletedReview } = useSelector((store) => {
    return store.reviewReducer;
  });
  const dispatch = useDispatch();

  const handleClickBookmark = () => {
    if (!bookmark && !review.id) {
      states.setShowModal(!states.showModal);
      states.setReview(review);
    } else {
      setBookmark(false);
      dispatch({
        type: TYPE.DELETE_REVIEW_REQUESTING,
        id: bookmarkId,
      });
    }
  };

  useEffect(() => {
    if (states.userReviews === undefined) return;
    states.userReviews.forEach((item) => {
      if (item.display_title === review.display_title) {
        setBookmark(true);
        setBookmarkId(item.id);
      }
    });
  }, [states.userReviews]);

  useEffect(() => {
    if (
      createdReview !== null &&
      createdReview.display_title === review.display_title
    ) {
      setBookmark(true);
      setBookmarkId(createdReview.id);
    }
  }, [createdReview]);

  useEffect(() => {
    if (review.id) {
      setBookmarkId(review.id);
    }
  }, [review.id]);

  if (deletedReview === review.id) {
    return <></>;
  }
  return (
    <MDBRow className="d-flex justify-content-center border rounded p-2 mb-2">
      <MDBCol md="9">
        {states.username && (
          <MDBBtn
            tag="a"
            color="none"
            className="pe-2 pb-2"
            style={
              bookmark || review.id
                ? { color: "#f7954e" }
                : { color: "#dd4b39" }
            }
            onClick={handleClickBookmark}
          >
            {bookmark || review.id ? (
              <MDBIcon fas icon="bookmark" size="lg" />
            ) : (
              <MDBIcon far icon="bookmark" size="lg" />
            )}
          </MDBBtn>
        )}
        <a
          href={review.link}
          target="_blank"
          rel="noreferrer"
          className="text-dark fw-bold fs-4"
        >
          {review.display_title}
        </a>

        <p className="fs-6">{review.summary_short}</p>
        <p className="fw-light pb-0 mb-0">
          <small>{review.byline}</small>
        </p>
        <p className="fw-light pt-0 mt-0">
          <small>{review.publication_date}</small>
        </p>
      </MDBCol>
      <MDBCol md="3">
        <MDBRipple
          rippleTag="a"
          href={review.link}
          target="_blank"
          rel="noreferrer"
        >
          <img src={review.img} className="img-fluid" alt="" />
        </MDBRipple>
      </MDBCol>
    </MDBRow>
  );
}
