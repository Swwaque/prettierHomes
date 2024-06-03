import * as React from 'react';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { isInValid, isValid } from "../../../../helpers/function/forms";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Skeleton } from 'primereact/skeleton';
import { TbBulb } from "react-icons/tb";
import { FaSquareFontAwesome } from "react-icons/fa6";
import './icon-picker.scss'
import { useTranslation } from 'react-i18next';

const IconPicker = ({ formik, defaultValue }) => {
  const iconName = formik.values.icon.replace('fa-solid fa-', '')
  const iconFound = findIconDefinition({ prefix: 'fas', iconName }) ? true : false;
  const { t } = useTranslation();

  return (
    <>
      <div className="icon-picker-container">
        <div className="displayer-wrapper">
          <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={
              <Popover>
                <Popover.Header><span>{t("iconPiker.popoverHeader")} </span></Popover.Header>
                <Popover.Body>
                  <div className="icon-info">
                    {t("iconPiker.popoverBody")}
                    <div>
                      <a
                        href="https://fontawesome.com/search?o=r&m=free&s=solid"
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{ color: 'blue' }}
                      >
                        {t("iconPiker.fontAwesome")} <FaSquareFontAwesome />
                      </a>
                    </div>
                  </div>
                </Popover.Body>
              </Popover>
            }
          >
            <div className="icon-tip">
              <TbBulb /><span>{t("iconPiker.info")} </span>
            </div>
          </OverlayTrigger>

          <div className={`selected-icon-displayer ${formik.errors.icon && formik.touched.icon ? 'error' : ''}`}>
            {iconFound
              ?
              <div className="selected-icon">
                <FontAwesomeIcon
                  icon={formik.values.icon}
                />
              </div>
              :
              <Skeleton width="100%" height="100%"></Skeleton>
            }
          </div>
        </div>
        <div className="icon-picker-input-wrapper">
          <Form.Group className="icon-input-group" controlId="icon">
            <Form.Label>{t("iconPiker.icon")} </Form.Label>
            <Form.Control
              className="icon-input"
              type="text"
              autoComplete="true"
              {...formik.getFieldProps("icon")}
              placeholder="fa-solid fa-icon name"
              isInvalid={isInValid(formik, 'icon')}
              isValid={isValid(formik, 'icon')}
            />
            <Form.Control.Feedback type="invalid" className="formik-feedback">
              {formik.errors.icon}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>
    </>
  );
}
export default IconPicker;