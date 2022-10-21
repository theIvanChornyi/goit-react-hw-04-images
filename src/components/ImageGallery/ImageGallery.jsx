import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { ImageGalleryGrid } from './ImageGallery.styled';
import { CardGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = forwardRef(({ images, ...other }, ref) => (
  <ImageGalleryGrid ref={ref} id="galery">
    {images.map(img => (
      <CardGalleryItem key={img.id} data={img} {...other} />
    ))}
  </ImageGalleryGrid>
));

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ).isRequired,
  other: PropTypes.shape({
    openModal: PropTypes.func.isRequired,
  }),
};
