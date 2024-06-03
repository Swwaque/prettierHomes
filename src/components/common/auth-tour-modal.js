import React from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'
import './auth-tour-modal.scss'
import { useTranslation } from 'react-i18next'

const AuthTourModal = ({ show, onHide }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <>
            <Modal
                className="auth-modal"
                show={show}
                onHide={onHide}
                size="sm"
                centered
            >
                <Modal.Body className="auth-modal-body">
                    <div className="close-wrapper">
                        <Button className='close-button' onClick={onHide}>
                            <HiXMark size={20} strokeWidth={1.5} />
                        </Button>
                    </div>
                    <Image
                        fluid
                        src="/images/content/house-tour.png"
                        className="tour-vector"
                    />
                    <h4>{t("authModal.h4") }</h4>
                    <p>
                       {t("authModal.subtitle")} <br />{t("authModal.subtitle2")}
                    </p>
                    <Button className='login-button' onClick={handleLogin}>
                        {t("authModal.loginButton")}
                    </Button>
                    <p>
                        {t("authModal.noAccountText")} <span className='register-link' onClick={handleRegister}> {t("authModal.createAccountLink")} </span>
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AuthTourModal