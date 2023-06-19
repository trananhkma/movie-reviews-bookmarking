import { MDBContainer } from "mdb-react-ui-kit";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectFolderModal } from "../components/FolderModal";
import Loading from "../components/Loading";
import ReviewItem from "../components/ReviewItem";
import TYPE from "../fun-redux/actions";

export default function ReviewList(props) {
  const dispatch = useDispatch();
  const { reviews, userReviews, loading, createdReview, deletedReview } =
    useSelector((store) => {
      return store.reviewReducer;
    });

  const { username } = useSelector((store) => {
    return store.authReducer;
  });

  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState();
  const [folder, setFolder] = useState();

  // get/set the last review
  const [lastElement, setLastElement] = useState(null);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        props.setOffset((no) => no + 20);
        props.setLoadMore(true);
      }
    })
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    dispatch({
      type: TYPE.GET_PUBLIC_REVIEW_REQUESTING,
      query: props.query,
      offset: props.offset,
      loadMore: props.loadMore,
    });
  }, [props.offset, props.search]);

  useEffect(() => {
    dispatch({
      type: TYPE.GET_USER_REVIEW_REQUESTING,
    });
  }, [createdReview, deletedReview]);

  const states = {
    showModal: showModal,
    setShowModal: setShowModal,
    folder: folder,
    setFolder: setFolder,
    review: review,
    setReview: setReview,
    username: username,
    userReviews: userReviews,
  };

  return (
    <MDBContainer>
      {username && <SelectFolderModal {...states} />}
      {reviews.map((review, index) => {
        if (index === reviews.length - 1) {
          return (
            <div ref={setLastElement} key={index}>
              <ReviewItem review={review} states={states} />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <ReviewItem review={review} states={states} />
            </div>
          );
        }
      })}

      {loading && <Loading />}
    </MDBContainer>
  );
}
