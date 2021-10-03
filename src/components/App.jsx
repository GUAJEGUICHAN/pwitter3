import React, { useEffect, useState } from 'react'
import { authService } from '../fbInstance';
import AppRouter from './AppRouter';

function App() {
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged(authService.getAuth(), user => {
      console.log("onAuthStateChanged", user);
      console.log(authService.getAuth().currentUser.uid);
      setUserObj(user);
    })
  })

  const refreshName = () => {
    setUserObj(Object.assign({}, authService.getAuth()))
  }
  return (
    <>
      {userObj && <AppRouter userObj={userObj} loggedIn={userObj !== null} refreshName={refreshName} />}
    </>

  );
}

export default App;
