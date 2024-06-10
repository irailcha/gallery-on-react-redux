import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Images.css";
import { useDispatch, useSelector } from "react-redux";
import { GoX } from "react-icons/go";
import { getPhotos } from "../../redux/ImagesRedux/operations";
import Card from "../Card/Card";
import { setCurrentPage } from "../../redux/ImagesRedux/reducer";

const Images = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.hits);
  const isFetching = useSelector((state) => state.photos.isFetching);
  const currentPage = useSelector((state) => state.photos.page);
  const total = useSelector((state) => state.photos.total);
  const perPage = useSelector((state) => state.photos.perPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const pages = [];
  const pageCount = Math.ceil(total / perPage);

  const createPages = (pageCount, currentPage) => {
    if (pageCount > 10) {
      if (currentPage > 6) {
        for (let i = currentPage - 4; i <= currentPage + 5; i++) {
          if (i > pageCount) break;
          pages.push(i);
        }
      } else {
        for (let i = 1; i <= 8; i++) {
          if (i > pageCount) break;
          pages.push(i);
        }
      }
    } else {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    }
  };
  createPages(pageCount, currentPage);

  useEffect(() => {
    dispatch(getPhotos(searchQuery, currentPage, perPage));
  }, [dispatch, currentPage, perPage, searchQuery]);

  const handleSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(getPhotos(searchQuery, 1, perPage));
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={handleSearch}
        />
      </div>
      {!isFetching ? (
        Array.isArray(photos) && photos.length > 0 ? (
          <ul className="image-list">
            {photos.map((photo) => (
              <li key={photo.id} onClick={() => openModal(photo)}>
                <Card props={photo} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No photos available.</p>
        )
      ) : (
        <div className="fetching"></div>
      )}
      <div className="pages">
        {pages.map((page, index) => (
          <span
            key={index}
            className={currentPage === page ? "current-page" : "page"}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Photo Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {selectedPhoto && (
          <div>
            <button className="close-modal-button" onClick={closeModal}>
              <GoX />
            </button>
            <img
              className="modal-image"
              src={selectedPhoto.largeImageURL}
              alt={selectedPhoto.tags}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Images;
