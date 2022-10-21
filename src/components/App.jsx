import { useState, useEffect, useRef } from 'react';

import { getImagesResponse } from 'services/API/pixabay';
import { SearchingImageApp } from './App.styled';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';

export const App = () => {
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [condition, setCondition] = useState('idle');
  const [modalPicture, setModalPicture] = useState('');
  const galeryRef = useRef();

  useEffect(() => {
    if (request) {
      setCondition('pending');
      get();
    }

    async function get() {
      try {
        const { data } = await getImagesResponse(request, page);
        setCondition('resolved');
        setImages(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        console.log('error', error);
      }
    }
  }, [page, request]);

  useEffect(() => {
    if (images.length > 12) {
      const { height } = galeryRef.current.getBoundingClientRect();
      window.scrollBy({
        top: height,
        behavior: 'smooth',
      });
    }
  }, [images.length]);

  const addUserRequest = data => {
    setPage(1);
    setImages([]);
    setRequest(data);
  };

  const openModal = data => {
    setModalPicture(data);
  };
  const mouseClose = e => {
    if (e.target === e.currentTarget) setModalPicture('');
  };
  const keyClose = e => {
    if (e.code === 'Escape') setModalPicture('');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setCondition('pending');
  };

  return (
    <>
      <SearchingImageApp>
        <Searchbar getImages={addUserRequest} />
        {modalPicture && (
          <Modal
            picture={modalPicture}
            mouseClose={mouseClose}
            keyClose={keyClose}
          />
        )}
        <ImageGallery ref={galeryRef} images={images} openModal={openModal} />
        {condition === 'pending' && <Loader />}
        {images.length / 12 === page && (
          <Button onClick={loadMore} name={request}></Button>
        )}
      </SearchingImageApp>
    </>
  );
};
