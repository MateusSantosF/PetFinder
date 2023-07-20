import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import style from '../../form/Form.module.css'
import {  Link } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import ErrorCard from "../../layout/ErrorCard";

const Login = ()=>{

    const {login, authUser} = useUserContext()

    const [user, setUser] = useState({})
    const [errors, setErrors] = useState([])

    function handleOnChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        const response = await login(user)

        if(response.errors){
            setErrors(response.errors)
            return;
        }

        await authUser(response)
    }

    return (
        <section>
             <div className="title_container">
                <h1>Efetue seu login</h1>
            </div>

            <ErrorCard errors={errors} />
            <form method="post" className={style.form_container} onSubmit={handleSubmit}>
                <Input 
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleOnChange}
                />
                 <Input 
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleOnChange}
                />

                <SubmitButton value='Logar' />
                <p>
                Não possui uma conta? <Link to='/register'>Clique aqui</Link>
            </p>
            </form>
           
        </section>
    )
}

export default Login;