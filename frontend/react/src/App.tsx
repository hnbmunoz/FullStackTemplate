import React, { useEffect } from 'react'
// import Login from './pages/Login/Login.jsx'
// import Notification from './components/notification/index.jsx'
// import useAlertStore from './store/zustandStore/useAlertStore.jsx'
// import { trimText  } from './utilities/helpers'
// import SelfReplicateComponent from './components/replicate/index'
import $ from 'jquery'
// import { Modal } from 'bootstrap'
import Authentication from './components/authentication/authentication'


import './assets/scss/base.scss'

const App = () => {
  // const { displayAlert } = useAlertStore((state) => ({ displayAlert: state.displayAlert }));
  // useEffect(() => {
  //   $(document).on("contextmenu", () => false);
  // }, []);
  
  return (
    <div className="App">
      {/* <Login />
  
      {displayAlert && <Notification />}  */}
      <Authentication />
    </div>
  )
}

export default App