import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user , serUser] = useState(null)
    const [loading , setLoading] = useState(null)

    const socialSignIn = () => { 
        return signInWithPopup(auth , googleProvider)
     }

    const registerUser = (email , password) => {
    setLoading(true)
     return createUserWithEmailAndPassword( auth, email , password)
    }
    
    const singInUser = (email , password) => {
        setLoading(true)
      return signInWithEmailAndPassword(auth , email , password)
    }

      const updataUserProfile = (profile) => {
      return updateProfile(auth.currentUser , profile)
    }
    


       const logOut = () => {
        setLoading(true)
      return signOut(auth)
    }

 

        useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth ,(currentUser) => {
          serUser(currentUser)
          setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }
    ,[])


    const authInfo = {
        socialSignIn,
        user,
        serUser,
        loading, 
        setLoading,
        logOut,
        registerUser,
        singInUser,
        updataUserProfile,
    }

    return <AuthContext value={authInfo} >{children}</AuthContext>
};

export default AuthProvider;