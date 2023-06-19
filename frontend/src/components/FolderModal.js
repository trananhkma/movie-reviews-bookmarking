import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRadio,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "../fun-redux/actions";
import { Bookmarks } from "../routes/urls";

export function SelectFolderModal(props) {
  const dispatch = useDispatch();
  const { folders } = useSelector((store) => {
    return store.folderReducer;
  });
  const [selectFolder, setSelectFolder] = useState();

  useEffect(() => {
    dispatch({
      type: TYPE.GET_FOLDER_REQUESTING,
    });
  }, []);

  const saveBookmark = (e) => {
    e.preventDefault();
    let folder = null;
    if (selectFolder === undefined) {
      folder = folders[0].id;
      setSelectFolder();
    } else {
      folder = selectFolder;
    }
    dispatch({
      type: TYPE.CREATE_REVIEW_REQUESTING,
      data: {
        ...props.review,
        folder_id: folder,
      },
    });
    props.setShowModal(!props.showModal);
  };

  return (
    <MDBModal show={props.showModal} setShow={props.setShowModal} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <form onSubmit={saveBookmark}>
            <MDBModalHeader>
              <MDBModalTitle>Select Folder</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                type="button"
                onClick={() => props.setShowModal(!props.showModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {folders.length === 0 && (
                <div>
                  You don't have any folder yet. Please{" "}
                  <a href={Bookmarks}>create one</a> first!
                </div>
              )}
              <div>
                {folders.map((folder, index) => {
                  if (index === 0) {
                    return (
                      <MDBRadio
                        name="folders"
                        key={"folder-" + index}
                        label={folder.name}
                        onChange={() => setSelectFolder(folder.id)}
                        defaultChecked
                      />
                    );
                  }
                  return (
                    <MDBRadio
                      name="folders"
                      key={"folder-" + index}
                      label={folder.name}
                      onChange={() => setSelectFolder(folder.id)}
                    />
                  );
                })}
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                type="button"
                onClick={() => props.setShowModal(!props.showModal)}
              >
                Close
              </MDBBtn>
              {folders.length > 0 && <MDBBtn type="submit">Save</MDBBtn>}
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

export function AddFolderModal(props) {
  const dispatch = useDispatch();
  const [folderName, setFolderName] = useState();
  const addFolder = (e) => {
    e.preventDefault();
    props.setShowModal(!props.showModal);
    dispatch({
      type: TYPE.CREATE_FOLDER_REQUESTING,
      data: {
        name: folderName,
      },
    });
  };
  return (
    <MDBModal show={props.showModal} setShow={props.setShowModal} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <form onSubmit={addFolder}>
            <MDBModalHeader>
              <MDBModalTitle>Add Folder</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                type="button"
                onClick={() => props.setShowModal(!props.showModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="Folder Name"
                onChange={(e) => setFolderName(e.target.value)}
                maxLength={20}
                required
              />
              <MDBTypography tag="small">Maximum 20 characters</MDBTypography>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                type="button"
                onClick={() => props.setShowModal(!props.showModal)}
              >
                Close
              </MDBBtn>
              <MDBBtn type="submit">Add</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
