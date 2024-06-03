import React from 'react'
import Spacer from '../components/common/spacer'
import RegisterForm from '../components/login-reqister/register-form'


const RegisterPage = () => {
  return (
    <>
      <Spacer minHeight={50} />
      <RegisterForm />
      <Spacer minHeight={50} />
    </>
  )
}

export default RegisterPage