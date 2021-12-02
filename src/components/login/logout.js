import {useState} from "react";
import { Redirect } from "react-router";

export default function Logout(){
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    if(token){
        setToken(localStorage.clear());
        //console.log(token)
    }

    return(
        <Redirect to={{ pathname:'/login',}}/>
    );

}