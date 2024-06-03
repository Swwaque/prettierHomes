import React from 'react'
import Spacer from '../components/common/spacer'
import LoginForm from '../components/login-reqister/login-form'

const LoginPage = () => {
  return (
    <>
      <Spacer minHeight={50} />
      <LoginForm />
      <Spacer minHeight={50} />
    </>
  )
}

export default LoginPage