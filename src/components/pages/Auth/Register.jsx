import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import style from '../../form/Form.module.css'
import {  Link } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import ErrorCard from "../../layout/ErrorCard";

const Register = ()=>{

    const {register, authUser} = useUserContext()

    const [user, setUser] = useState({})
    const [errors, setErrors] = useState([])

    function handleOnChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        const response = await register(user)

        if(response.errors){
            setErrors(response.errors)
            return;
        }

        await authUser(response)
    }

    return (
        <section>
            <div className="title_container">
                <h1>Realize seu cadastro abaixo!</h1>
            </div>
            <ErrorCard errors={errors} />
            <form method="post" className={style.form_container} onSubmit={handleSubmit}>
                <Input 
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    handleOnChange={handleOnChange}
                />
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
                <Input 
                    text="Confirme sua Senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Digite novamente sua senha"
                    handleOnChange={handleOnChange}
                />

                <SubmitButton value='Cadastrar' />
                <p>
                Já tem uma conta? <Link to='/login'>Clique aqui</Link>
            </p>
            </form>
           
        </section>
    )
}

export default Register;