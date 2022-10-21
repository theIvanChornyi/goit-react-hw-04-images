import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { Overlay, FullImage } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({
  mouseClose,
  keyClose,
  picture: { tags, largeImageURL },
}) => {
  useEffect(() => {
    document.addEventListener('keydown', keyClose);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', keyClose);
      document.body.style.overflow = 'unset';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <Overlay onClick={mouseClose}>
      <FullImage>
        <img src={largeImageURL} alt={tags} />
      </FullImage>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  keyClose: PropTypes.func,
};
