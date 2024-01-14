import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);

//googleProvider
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  //state
  const [user, setuser] = useState();
  const [loading, setLoading] = useState(true);

  //create a user
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //loginUser
  const loginUser = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

  //logOut
  const logOut=()=>{
    return signOut(auth)
  }

  //googleLogin
  const googleLogin = ()=>{
    return signInWithPopup(auth,googleProvider)
  }


  //unsubscribe
  useEffect(()=>{
    const unSubsCribe = onAuthStateChanged(auth, (currentUser)=>{
        console.log('current user',currentUser);
        setuser(currentUser);
        setLoading(false)
    })

    return ()=> unSubsCribe()
  },[])

  //authObj
  const authObj = { createUser,user,loginUser,logOut,googleLogin,loading };

  return (
    <AuthContext.Provider value={authObj}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
