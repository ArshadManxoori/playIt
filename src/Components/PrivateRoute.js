import React , {Component, useContext} from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function PrivateRoute({component:Component,...rest}) {  //rest me match loaction history hai, ig rest='/' hega OR 'From props, get the Component prop and then all other props given to you, and rename props to rest'
    const {user} = useContext(AuthContext)
    return (
        <Route {...rest} render={(props)=>{
            return user?<Component {...props}/> : <Redirect to="login"/>
        }}/>    
    )
}

export default PrivateRoute
