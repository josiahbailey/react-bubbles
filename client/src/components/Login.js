import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'

const Login = () => {
   // make a post request to retrieve a token from the api
   // when you have handled the token, navigate to the BubblePage route
   const history = useHistory()
   const [user, setUser] = useState({
      username: '',
      password: ''
   })

   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = e => {
      e.preventDefault()
      axiosWithAuth()
         .post(`/login`, user)
         .then(res => {
            console.log(res)
            window.localStorage.setItem('token', res.data.payload)
            history.push('/bubbles')
         })
         .catch(err => {
            console.log('ERROR', err)
         })
   }

   return (
      <>
         <h1>Welcome to the Bubble App!</h1>
         <p>Build a login page here</p>
         <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type='text' name='username' value={user.username} placeholder='username' />
            <input onChange={handleChange} type='password' name='password' value={user.password} placeholder='password' />
            <button type='submit' >Login</button>
         </form>
      </>
   );
};

export default Login;
