import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleUserName = (e) => {
    setUserName(e.currentTarget.value)
  }

  const handleUserPassword = (e) => {
    setUserPassword(e.currentTarget.value)
  }

  const handleLogin = () => {
    axios({
      method: 'post',
      url: 'http://206.189.91.54/api/v1/auth/sign_in',
      headers: {}, 
      data: {
        email: userName,
        password: userPassword, // This is the body part
      }
    }).then(res => {
      // setInputMessage("");
      console.log(res)
      // console.log(res.data)
    }).catch(ex => {
      // alert("Something went wrong. Please check the server API and try again");
      console.error(ex);
    });
  }

  return (
    <div>      
      <input placeholder='username' value={userName} onChange={handleUserName}></input>
      <input placeholder='password' value={userPassword} onChange={handleUserPassword}></input>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login