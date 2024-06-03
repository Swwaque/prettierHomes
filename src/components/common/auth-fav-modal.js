import React from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../store/slices/fav-slice'
import './auth-fav-modal.scss'
import { useTranslation } from 'react-i18next'

const AuthFavModal = () => {
  const { modal } = useSelector(state => state.fav);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = () => {
    dispatch(hideModal())
    navigate('/login')
  }

  const handleRegister = () => {
    dispatch(hideModal())
    navigate('/register')
  }

  return (
    <>
      <Modal
        className="auth-modal"
        show={modal}
        onHide={() => dispatch(hideModal())}
        size="sm"
        centered
      >
        <Modal.Body className="auth-modal-body">
          <div className="close-wrapper">
            <Button className='close-button' onClick={() => dispatch(hideModal())}>
              <HiXMark size={20} strokeWidth={1.5} />
            </Button>
          </div>
          <Image
            fluid
            src="/images/content/search-fav.png"
            className="fav-vector"
          />
          <h4>{t('authModal.title')}</h4>
          <p>
           {t('authModal.subtitle')} <br />{t('authModal.subtitle2')}
          </p>
          <Button className='login-button' onClick={handleLogin}>
            {t('authModal.loginButton')}
          </Button>
          <p>
            {t('authModal.noAccountText')}? <span className='register-link' onClick={handleRegister}>{t('authModal.createAccountLink')}</span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AuthFavModal