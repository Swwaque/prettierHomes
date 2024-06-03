import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { deleteImageByIds, updateImageById } from "../../../../api/image-service";
import { useToast } from "../../../../store/providers/toast-provider";
import "./display-images.scss";
import { useTranslation } from "react-i18next";

const DisplayImages = ({ display, setDisplay, advertId }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const { showToast } = useToast();
  const {t} = useTranslation();

  const toggleImageSelection = (image) => {
    const isSelected = selectedImages.includes(image);
    if (isSelected) {
      setSelectedImages((prev) => prev.filter((item) => item !== image));
    } else {
      setSelectedImages((prev) => [...prev, image]);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteImageByIds(selectedImages.map((item) => item.id));
      setDisplay(display.filter((item) => !selectedImages.includes(item)));
      setSelectedImages([]);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
      });
    }
  };

  const updateFeatured = (resp) => {
    setDisplay((prev) => {
      return prev.map((item) => {
        if (item.featured) {
          item.featured = false;
        }
        if (item.id === resp.id) {
          item.featured = true;
        }
        return item;
      });
    });
  };

  const handlefeatured = async () => {
    const payload = {
      imgId: selectedImages[0].id,
      advertId: advertId,
    };
    try {
      const resp = await updateImageById(payload);
      showToast({
        severity: "success",
        summary: t("success.success"),
        detail: t("displayImagesTranslations.detailSuccess"),
        life: 2000,
        icon: "pi pi-check-circle",
      });

      updateFeatured(resp);
      setSelectedImages([]);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
      });
    }
  };
  return (
    <Container className="display-image">
      <div className="display-wrapper">
        <Row className="display-area row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6">
          {display.map((image, index) => (
            <Col key={index} className="image-col">
              <div className={`img-wrapper ${image.featured && "featured"}`}>
                <label className="checkbox-wrapper">
                  <input
                    id={`hidden-checkbox-${index}`}
                    type="checkbox"
                    checked={selectedImages.includes(image)}
                    onChange={() => toggleImageSelection(image)}
                  />
                  <span className="checkmark"></span>
                  <Image
                    fluid
                    src={`data:${image.type};base64, ${image.data}`}
                    draggable={false}
                  />
                </label>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="display-image-buttons">
        <div className="button-wrapper">
          <Button
            disabled={selectedImages.length !== 1}
            onClick={handlefeatured}
            variant="danger"
          >
            {t("displayImagesTranslations.sf")}
          </Button>

          <Button
            disabled={selectedImages.length === 0}
            onClick={handleDelete}
            variant="danger"
          >
            {t("displayImagesTranslations.delete")}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default DisplayImages;