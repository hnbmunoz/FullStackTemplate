import React from 'react'
import Login from './pages/Login/Login.jsx'
import Notification from './components/notification/index.jsx'
import useAlertStore from './store/zustandStore/useAlertStore.jsx'

import './assets/scss/base.scss'

const App = () => {
  const { displayAlert } = useAlertStore((state) => ({ displayAlert: state.displayAlert }));
  return (
    <div className="App">
      <Login />
      {displayAlert && <Notification />} 
    </div>
  )
}

export default App