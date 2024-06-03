import React, { useCallback, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Cropper from 'react-easy-crop';
import { cropImage } from '../../../../helpers/function/crop-image';
import { TbZoomInArea } from "react-icons/tb";
import './crop-modal.scss';
import { useTranslation } from 'react-i18next';

const CropModal = ({ baseImage, onCrop, show, onHide }) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const {t}  = useTranslation();

    const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleDoneClick = useCallback(async () => {
        try {
            const croppedImage = await cropImage(baseImage, croppedAreaPixels);
            onCrop(croppedImage);
            setZoom(1);
            setCrop({ x: 0, y: 0 });
        } catch (error) {
            console.error(error)
        } finally {
            onHide();
        }
        // eslint-disable-next-line
    }, [croppedAreaPixels])

    return (
        <>
            <Modal className="cropper-modal" show={show} size="lg" onHide={onHide}>
                <Modal.Body>
                    <div className="cropper-body">
                        <Cropper
                            image={baseImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="cropper-footer">
                        <div className="zoom-icon">
                            <TbZoomInArea size={24} />
                        </div>
                        <Form.Range
                            className="zoom-slider"
                            type="range"
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            min="1"
                            max="3"
                            step="0.1"
                        />
                        <Button className="done-button" onClick={handleDoneClick}>
                            {t('cropModalTranslations.buttonDone')}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CropModal