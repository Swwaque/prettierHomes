import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { deleteTourRequest } from '../../../../api/tour-requests-service';
import { Image as FullImage } from 'primereact/image';
import { triggerRefresh } from '../../../../store/slices/misc-slice';
import { useToast } from '../../../../store/providers/toast-provider';
import { HiArrowUturnLeft, HiChevronRight, HiOutlineTrash } from "react-icons/hi2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbFaceIdError } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tag } from 'primereact/tag';
import ButtonLoader from '../../../common/button-loader';
import "./admin-tour-request-detail.scss"
import { useTranslation } from 'react-i18next';


const AdminTourRequestDetail = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const tr = location.state;
  const advertAddress = () => {
    return tr?.advert?.district?.name + ", " +
      tr?.advert?.city?.name + ", " +
      tr?.advert?.country?.name;
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTourRequest(tr?.id);
      showToast({
        severity: t("success.success"),
        summary: t("tourRequestDetail.deleted"),
        detail: t("tourRequestDetail.successDetail"),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      dispatch(triggerRefresh());
      navigate("/dashboard/tour-requests");
    } catch (error) {
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: Object.values(error.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });

    } finally {
      setLoading(false);
    }
  }

  const getTagStyle = (status) => {
    switch (status) {
      case 'PENDING':
        return '#f18506';
      case 'APPROVED':
        return '#61c141';
      case 'DECLINED':
        return '#ec4747';
      default:
        return null;
    }
  };

  return (
    <>
      <Container className='admin-tour-request-detail-container'>
        <Row className='admin-tour-details-wrapper'>
          <Col xs={12} lg={6} className="tour-image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${tr?.image?.type};base64, ${tr?.image?.data}`}
              alt={`${tr?.image?.name}`}
              preview
            />
          </Col>

          <Col xs={12} lg={6} className='tour-info'>
            <div className="advert-status-info">
              <div className="title-address">
                <h5 className="title">
                  {tr?.advert?.title}
                </h5>
                <div className="address">
                  {advertAddress()}
                </div>
                <div className="tour-status">
                  <Tag
                    value={t(`statusForTourRequest.${tr?.status}`)}
                    className="tour-request-tag"
                    style={{ backgroundColor: getTagStyle(tr?.status) }}
                  />
                </div>
              </div>
              <div className="price">
                {`$${tr.advert?.price.toLocaleString()}`}
              </div>
            </div>

            <div className='tour-date-time'>
              <Form.Group className='form-group-date'>
                <Form.Text>{t("tourRequestDetail.tourDate")} </Form.Text>
                <Form.Control
                  name='tourDate'
                  type="text"
                  value={tr?.tourDate}
                  readOnly
                />
              </Form.Group>


              <Form.Group className='form-group-time'>
                <Form.Text>{t("tourRequestDetail.tourTime")} </Form.Text>
                <Form.Control
                  name='tourTime'
                  type="text"
                  placeholder={tr?.tourTime}
                  readOnly
                />
              </Form.Group>
            </div>

            <div className='button-wrapper'>
              <Button
                className="back-button"
                variant="secondary"
                type="button"
                onClick={() => navigate(-1)}
              >
                <HiArrowUturnLeft size={20} />{t("tourRequestDetail.back")}
              </Button>

              <Button
                className="delete-button"
                variant="warning"
                type="button"
                onClick={handleDelete}
              >
                {loading ? <ButtonLoader /> : <HiOutlineTrash size={20} />}{t("tourRequestDetail.delete")}
              </Button>
            </div>

          </Col>
        </Row>

        <Row className='admin-tour-details-user-wrapper'>
          {tr && [{ ...tr?.ownerUser, status: t("tourRequestDetail.owner") },
          { ...tr?.guestUser, status: t("tourRequestDetail.guest") }].map((user, index) => (
            <Col xs={12} lg={6} className="user-col" key={index}>
              <div className="user-details" onClick={() => navigate("/dashboard/users/edit", { state: { ...user } })}>
                <div className="user-image-wrapper">
                  <Image
                    className="user-image"
                    src={user?.profilePhoto ? `data:${user?.profilePhoto?.type};base64, ${user?.profilePhoto?.data}` : "/images/profile/user.jpg"}
                    alt="user-image"
                    draggable={false}
                    fluid
                  />
                </div>

                <div className="user-info">
                  <div className="user-name">
                    <Tag
                      value={user.status}
                      className="user-tag"
                    />
                    {`${user?.firstName} ${user?.lastName}`}
                  </div>
                  <div className="user-phone">
                    {`${user?.phone}`}
                  </div>
                  <div className="user-email">
                    {`${user?.email}`}
                  </div>
                </div>

                <div className="user-details-link">
                  <HiChevronRight />
                </div>
              </div>
            </Col>))}
        </Row>
      </Container >
    </>
  );
};

export default AdminTourRequestDetail;
