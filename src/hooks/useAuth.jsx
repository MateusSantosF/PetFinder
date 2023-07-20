import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const USER_TOKEN_KEY = 'authToken'
const USER_ID_KEY = 'userId'

const useAuth = () =>{
    
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem(USER_TOKEN_KEY);

        if(token){
            api.defaults.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true)

        }
    },[authenticated])

    async function register(user){
        try {
            const data = await api.post('/users/register', user)
            .then(response=>{
                return response.data
            })
            return data;
        } catch (error) {
            return error.response.data
        }
    }

    async function login(user){
        try {
            const data = await api.post('/users/login', user)
            .then(response=>{
                return response.data
            })
            return data;
        } catch (error) {
            return error.response.data
        }
    }

    async function getCurrentUser(){
        
        try {
            const data = await api.get('/users/checkuser')
            .then(response=>{
                return response.data
            })
            return data;
        } catch (error) {
            return error.response.data
        }
    }

    async function authUser(data){

        setAuthenticated(true);
        localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(data.token))
        localStorage.setItem(USER_ID_KEY, JSON.stringify(data.userId))
        navigate('/')
    }

    function logout(){
        localStorage.removeItem(USER_TOKEN_KEY)
        localStorage.removeItem(USER_ID_KEY)
        api.defaults.headers['Authorization'] = undefined
        navigate('/')
        window.location.reload();
    }

    return {register, authUser, authenticated, login, logout, getCurrentUser}
}

export default useAuth;