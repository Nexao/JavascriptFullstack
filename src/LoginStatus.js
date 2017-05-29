

import React from 'react'
import Auth from './models/Authenticate'

const LoginStatus = () =>{

    if(Auth.isUserAuthenticated()){
        return(
            <div>
                <p style={{color:"white"}}>Your are logged in as: {Auth.getUserName()}</p>
            </div>
        )
    }
    else {
        return (
            <div>
            <p style={{color:"white"}}>Your are not logged in!</p>
            </div>
        )
    }

}

export default LoginStatus