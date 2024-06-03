import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { resetDatabase } from "../../../../api/settings-service";
import { TbFaceIdError } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useToast } from '../../../../store/providers/toast-provider';
import { BsDatabaseFillExclamation } from "react-icons/bs";
import { logout } from "../../../../store/slices/auth-slice";
import { useDispatch } from "react-redux";
import "./admin-reset.scss";
import { useTranslation } from "react-i18next";
 


const AdminReset = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const CONFIRM_TEXT = t("adminResetTranslations.resetDatabase").toLocaleLowerCase();

  const handleDelete = async () => {
    if (show) {
      setLoading(true);
      try {
        if (confirmText === CONFIRM_TEXT) {
          await resetDatabase();
          showToast({
            severity: 'success',
            summary: t('adminResetTranslations.summarySuccess'),
            detail: t('adminResetTranslations.detailSuccess'),
            life: 2000,
            icon: <IoMdCheckmarkCircleOutline size={50} />,
          });
          dispatch(logout());
        }
      } catch (err) {
        const errMsg = Object.values(err.response.data)[0];
        showToast({
          severity: "error",
          summary: t('error.error'),
          detail: errMsg,
          life: 2000,
          icon: <TbFaceIdError size={50} />,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setShow(true);
    }
  };

  return (
    <div className="admin-reset-container">
      <div className="admin-reset-title">
        <BsDatabaseFillExclamation className={`reset-icon ${confirmText === CONFIRM_TEXT ? "danger" : ""}`} size={100} />
        <h6 className="reset-label"> {t('adminResetTranslations.resetDatabase')}</h6>
      </div>

      <div className="reset-text">
        <span>
          {t('adminResetTranslations.resetTextSpan')}
        </span>
      </div>

      <div className="reset-button-wrapper">
        <Button className={`reset-button ${confirmText === CONFIRM_TEXT ? "danger" : ""}`}
          onClick={handleDelete}
          disabled={(show && confirmText !== CONFIRM_TEXT) || loading}>
          {t('adminResetTranslations.buttonReset')}
        </Button>
      </div>
      <div className={`reset-input-wrapper ${show ? "" : "d-none"}`} >
        <Form.Group className="reset-input-group" controlId="confirmText">
          <Form.Label className={`reset-input-label`}>
           {t('adminResetTranslations.labelConfirm')} "{CONFIRM_TEXT}"
          </Form.Label>
          <Form.Control
            className="reset-input"
            type="text"
            autoComplete="off"
            placeholder={CONFIRM_TEXT}
            name="confirmText"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            isInvalid={confirmText !== CONFIRM_TEXT}
            isValid={confirmText === CONFIRM_TEXT}
          />
        </Form.Group>
      </div>
    </div >
  );
};

export default AdminReset;
