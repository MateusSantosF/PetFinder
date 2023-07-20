import { Link } from "react-router-dom";
import style from './Navbar.module.css'
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import {PiDogDuotone} from 'react-icons/pi'

const Navbar = ()=>{

    const {isAuthenticated, logout} = useUserContext()

    return (
       <nav className={style.navbar}>
        <PiDogDuotone size='42' color="white" />
            <ul>
                <li>
                     <Link to="/">Adotar</Link>
                 </li>
                {isAuthenticated ? (
                    <>
                    <li>
                         <Link to="/pets/myadoptions">Minhas adoções</Link>
                    </li>
                     <li>
                         <Link to="/pets/mypets">Meus Pets</Link>
                    </li>
                    <li>
                         <Link to="/user/profile">Meu Perfil</Link>
                    </li>
                    <button onClick={logout}>Sair</button>
                    </>
                ) : (<>
                    <li>
                         <Link to="/login">Logar</Link>
                    </li>
                    <li>
                        <Link to="/register">Cadastrar</Link>
                    </li>
                </>) }      
            </ul>
       </nav>
    )
}

export default Navbar;