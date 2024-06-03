import React, { useRef, useState } from "react";
import ImageModal from "../../../common/image-modal";
import { Col, Container, Image, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import './advert-images.scss';
import { useTranslation } from "react-i18next";

const AdvertImages = ({ formik, field }) => {
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(-1);
  const { t } = useTranslation();

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      formik.setFieldValue(field, [
        ...formik.values[field],
        ...Array.from(files),
      ]);
    }
  };

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files);
    // Dosya seçimi yapıldıktan sonra input'un value'sini temizle
    e.target.value = null;
  };

  return (
    <Container className="advert-image">
      <div className="image-upload">
        {formik.values[field].length > 0 && (
          <div className="plus-button" onClick={handleAreaClick}>
            <FaPlus size={30} />
          </div>
        )}

        <div
          className="upload-area"
          onClick={formik.values[field].length > 0 ? null : handleAreaClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div>
            {formik.values[field].length > 0 ? (
              <>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4">
                  {formik.values[field].map((image, index) => (
                    <Col key={index}>
                      <div className="img-wrapper">
                        <Image
                          fluid
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={t(`advertImageTranslations.imgAlt ${index + 1}`)}
                          onClick={() => setOpen(index + 1)}
                          draggable={false}
                        />
                      </div>

                      {open === index + 1 && (
                        <ImageModal
                          field={field}
                          formik={formik}
                          index={index}
                          image={image}
                          show={open}
                          onHide={() => setOpen(-1)}
                        />
                      )}
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <p className="upload-area-inner-text">
                {t("advertImageTranslations.pTitle")}
              </p>
            )}
          </div>
        </div>
        {formik.errors[field] && (
          <div className="image-feedback">{formik.errors[field]}</div>
        )}

        <label className="file-label">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
          />
        </label>
      </div>
    </Container>
  );
};

export default AdvertImages;
