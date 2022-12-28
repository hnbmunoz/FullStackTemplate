import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import userProfileStore from '../../store/zustandStore/useProfileStore.jsx'
import useAlertStore from '../../store/zustandStore/useAlertStore.jsx'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const { overwriteProfile } = userProfileStore(
    (state) => ({     
      overwriteProfile: state.overwriteProfile,     
    })
  );

  const { displayAlert, showAlert, hideAlert } = useAlertStore(
    (state) => ({  
      displayAlert: state.displayAlert,   
      showAlert: state.showAlert,  
      hideAlert: state.hideAlert   
    })
  );

  const notifTimeout = useRef();

  useEffect(() => {
    if (!displayAlert) return
    notifTimeout.current = setTimeout( hideAlert,2000)  
    return () => {
      clearTimeout(notifTimeout.current)
    }
  }, [displayAlert])
  



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
      overwriteProfile(res.headers)
      showAlert()
      console.log(res)
      // console.log(res.data)
    }).catch(ex => {
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