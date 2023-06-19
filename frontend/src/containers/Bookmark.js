import {
  MDBBadge,
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddFolderModal } from "../components/FolderModal";
import Loading from "../components/Loading";
import ReviewItem from "../components/ReviewItem";
import TYPE from "../fun-redux/actions";

export default function Bookmark() {
  const { folders, loading } = useSelector((store) => {
    return store.folderReducer;
  });
  const { deletedReview } = useSelector((store) => {
    return store.reviewReducer;
  });
  const [showModal, setShowModal] = useState(false);
  const [showFolder, setShowFolder] = useState();
  const handleShowFolder = (value) => {
    if (value === showFolder) return;
    setShowFolder(value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: TYPE.GET_FOLDER_REQUESTING,
    });
  }, [deletedReview]);

  return (
    <MDBContainer className="pt-3">
      <AddFolderModal showModal={showModal} setShowModal={setShowModal} />
      <MDBBtn
        style={{ backgroundColor: "#55acee" }}
        onClick={() => setShowModal(!showModal)}
      >
        <MDBIcon fas className="me-2" icon="folder-plus" /> Folder
      </MDBBtn>
      {loading && <Loading />}
      <MDBRow>
        <MDBCol size={3}>
          <MDBListGroup>
            <MDBTabs>
              {folders.map((folder) => {
                return (
                  <MDBListGroupItem
                    action
                    active={showFolder === folder.name}
                    noBorders
                    className="d-flex justify-content-between align-items-center"
                    onClick={() => handleShowFolder(folder.name)}
                    key={"folder-view-" + folder.id}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      <MDBIcon fas className="me-2" icon="folder" />
                      {folder.name}
                    </div>
                    <MDBBadge pill>{folder.reviews.length}</MDBBadge>
                  </MDBListGroupItem>
                );
              })}
            </MDBTabs>
          </MDBListGroup>
        </MDBCol>
        <MDBCol size={9}>
          <MDBTabsContent>
            {folders.map((folder) => {
              return (
                <MDBTabsPane
                  show={showFolder === folder.name}
                  key={"folder-review-" + folder.id}
                >
                  {folder.reviews.map((review) => {
                    return (
                      <ReviewItem
                        review={review}
                        states={{ username: true }}
                        key={"review-view-" + review.id}
                      />
                    );
                  })}
                </MDBTabsPane>
              );
            })}
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
