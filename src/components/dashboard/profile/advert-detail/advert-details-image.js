import React from "react";
import { useSelector } from "react-redux";
import { Galleria } from 'primereact/galleria';
import { Image } from 'primereact/image';
import { Container } from "react-bootstrap";
import "./advert-details-image.scss";

const AdvertDetailsImage = () => {
  const { advertDetails } = useSelector((state) => state.misc);
  const images = advertDetails?.images;

  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3
    },
    {
      breakpoint: "767px",
      numVisible: 2,
    },
    {
      breakpoint: '460px',
      numVisible: 1
    }
  ];

  const shownItem = (item) => {
    return (
      <div >
        <Image
          className="shown-image-wrapper"
          src={`data:${item.type};base64, ${item.data}`}
          alt={item.name}
          draggable={false}
          preview
        />
      </div>
    );
  };

  const thumbnails = (item) => {
    return (
      <img
        className="thumbnail-image"
        src={`data:${item.type};base64, ${item.data}`}
        alt={`Thumbnail ${item.name}`}
      />
    );
  };

  return (
    <Container className="advert-details-image-container">
      <Galleria
        className="galleria"
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={4}
        item={shownItem}
        thumbnail={thumbnails}
      />
    </Container>
  );
};

export default AdvertDetailsImage;
