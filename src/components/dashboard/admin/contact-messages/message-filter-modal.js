import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { TbFilterX, TbCheck } from "react-icons/tb";
import './message-filter-modal.scss'
import { useTranslation } from 'react-i18next'

const MessageFilterModal = ({ showFilter, setShowFilter, formik }) => {

  const handleResetFilter = () => {
    formik.resetForm();
    formik.handleSubmit();
    setShowFilter(false);
  };

  const handleDone = () => {
    formik.handleSubmit()
    setShowFilter(false);
  };

  const {t} = useTranslation();

  return (
    <>
      <Modal
        className="contact-message-filter-modal"
        show={showFilter}
        onHide={() => setShowFilter(false)}
        size="sm"
        centered
      >
        <Modal.Body className="message-filter-modal-body">
          <div className="modal-button-wrapper">
            <Button
              className='no-filter-button modal-button'
              onClick={handleResetFilter}
              title={t("modalFilter.noFilter")}
            >
              <TbFilterX size={20} strokeWidth={1.5} />
            </Button>
            <Button
              className='done-button modal-button'
              onClick={handleDone}
              title={t("modalFilter.applyFilter")}
            >
              <TbCheck size={20} strokeWidth={1.5} />
            </Button>
          </div>

          <Form.Group
            className="filter-form-group"
            controlId="status"
          >
            <Form.Label>{t("modalFilter.searchIn")} </Form.Label>
            <Form.Control
              as="select"
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
            >
              <option value="">
                {t("modalFilter.all")}
              </option>
              <option value={true}>
                {t("modalFilter.read")}
              </option>
              <option value={false}>
              {t("modalFilter.unread")}
              </option>
            </Form.Control>
            <Form.Control.Feedback type="invalid" className="form-feedback">
              {formik.errors.tourTime}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="filter-form-group" controlId="startDate">
            <Form.Label>{t("modalFilter.startDate")} </Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              onChange={formik.handleChange}
              value={formik.values.startDate}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.startDate}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="filter-form-group" controlId="endDate">
            <Form.Label>{t("modalFilter.endDate")} </Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              onChange={formik.handleChange}
              value={formik.values.endDate}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.endDate}
            </Form.Control.Feedback>
          </Form.Group>

        </Modal.Body>
      </Modal >
    </>
  )
}

export default MessageFilterModal