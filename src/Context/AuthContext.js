import React, {useState, useEffect} from 'react'
import { auth } from '../firebase';
export const AuthContext = React.createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, Password){
        return auth.createUserWithEmailAndPassword(email, Password); 
    }
    function login(email, Password){
        return auth.signInWithEmailAndPassword(email, Password);
    }
    function logout(){
        return auth.signOut();
    }

    useEffect(()=>{
        const unsubs = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        })
        return () => {  //componentWillUnmount
            unsubs();
        }
    },[])

    const store = {
        user,
        signup,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )

}