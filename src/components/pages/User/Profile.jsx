import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import style from './Profile.module.css'
import formStyle from '../../form/Form.module.css'
import { useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import ErrorCard from "../../layout/ErrorCard";
import api from "../../../utils/api";
import toast, { Toaster } from 'react-hot-toast';



const Profile = () => {

    const { getCurrentUser } = useUserContext()

    const [user, setUser] = useState({})
    const [errors, setErrors] = useState([])
    const [preview, setPreview] = useState('')

    useEffect(() => {
        getCurrentUser()
            .then(response => {
                setUser(response)
            })
    }, [getCurrentUser])

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleOnChangeFile(e) {

        const file = e.target.files[0]
        setUser({ ...user, image: file })
        setPreview(file)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()
        Object.keys(user).forEach(key => {
            formData.append(key, user[key])
        })

        api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            toast.success("Usuário atualizado com sucesso!")
        }).catch((err) => {
            setErrors(err.response.data.errors)
        })

    }

    return (
        <section>
            <div className={style.profile_header}>
                <h1 className="text_gray">Editar Perfil</h1>

                {(user.image || preview) && (
                    <img
                        src={preview ? URL.createObjectURL(preview) : `${import.meta.env.VITE_APP_API}/images/users/${user.image}`}
                        alt={user.name}
                    />
                )}
            </div>
            <Toaster />
            <ErrorCard errors={errors} />
            <form method="post" className={formStyle.form_container} onSubmit={handleSubmit}>

                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={handleOnChangeFile}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    value={user.name || ''}
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    value={user.phone || ''}
                    placeholder="Digite seu telefone"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    value={user.email || ''}
                    placeholder="Digite seu email"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    value={user.password || ''}
                    placeholder="Digite sua senha"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Confirme sua Senha"
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword || ''}
                    placeholder="Digite novamente sua senha"
                    handleOnChange={handleOnChange}
                />

                <SubmitButton value='Atualizar' />

            </form>

        </section>
    )
}

export default Profile;