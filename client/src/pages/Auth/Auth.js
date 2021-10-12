import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { REGISTER_USER, LOGIN_USER } from '../../utils/mutations.js'
import AuthService from '../../utils/auth.js'

const Auth = () => {
  const [authState, setAuthState] = useState({
    name: '',
    email: '',
    password: '',
    lEmail: '',
    lPassword: ''
  })

  return (
    <>
    </>
  )
}

export default Auth