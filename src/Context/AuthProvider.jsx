import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user , serUser] = useState(null)
    const [loading , serLoading] = useState(null)

    const socialSignIn = () => { 
        return signInWithPopup(auth , googleProvider)
     }


       const logOut = () => {
        serLoading(true)
      return signOut(auth)
    }
    


        useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth ,(currentUser) => {
          serUser(currentUser)
          serLoading(false)
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
        serLoading,
        logOut,
    }

    return <AuthContext value={authInfo} >{children}</AuthContext>
};

export default AuthProvider;