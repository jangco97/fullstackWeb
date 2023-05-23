import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageSlider = ({ images }) => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
      {images.map(image => (
        <div
          key={image}
          className='min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-70'>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
            alt={image}
            className='h-full w-full object-cover object-center lg:h-full lg:w-full'
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
