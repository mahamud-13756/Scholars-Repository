import { createContext, useEffect, useState } from "react";
import {  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, sendEmailVerification } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                sendEmailVerification(user)
                    .then(() => console.log('Email verification sent!'))
                    .catch((error) => console.error('Error sending email verification:', error));
                    console.log('verification return result:', result);
                return result;
            });
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfileName = (name) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    }
    const updateUserProfilePhoto = (photo) => {
        return updateProfile(auth.currentUser, { photoURL: photo });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
            
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        logOut,
        updateUserProfileName,
        updateUserProfilePhoto
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;