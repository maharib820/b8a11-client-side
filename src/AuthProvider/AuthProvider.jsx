import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../Firebase/Firebase.config"
import PropTypes from 'prop-types';
// import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            // const userEmail = currentUser?.email || user?.email;
            // const loggedUser = { email: userEmail }
            setUser(currentUser);
            setLoading(false);
        //     if (currentUser) {
        //         axios.post('https://server-hire-wave.vercel.app/jwt', loggedUser, {
        //             withCredentials: true
        //         })
        //             .then(res => {
        //                 console.log('token response get', res.data);
        //             })
        //     }
        //     else {
        //         axios.post("https://server-hire-wave.vercel.app/logout", loggedUser, {
        //             withCredentials: true
        //         })
        //             .then(res => console.log(res.data))
        //     }
         })
        return () => {
            unSubscribe();
        }
    }, [user?.email])

    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login user
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const info = {
        user, loading, createUser, signIn, logOut, auth
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}