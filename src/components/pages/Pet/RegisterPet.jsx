import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import style from '../../form/Form.module.css'
import registerPetStyle from './Pet.module.css'
import { useState } from "react";
import ErrorCard from "../../layout/ErrorCard";
import api from "../../../utils/api";
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";


const RegisterPet = () => {


    const [preview, setPreview] = useState([])
    const navigate = useNavigate()
    const [pet, setPet] = useState({})
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(false)

    function handleOnChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    function handleFiles(e) {
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images: [...e.target.files] })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        Object.keys(pet)
        .map(key => {

            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })
        setDisabled(true)
        api.post('/pets/register', formData)
            .then(() => {
                toast.success('Pet cadastrado com sucesso.')
                navigate('/pets/mypets')
            }).catch(err => {
                setErrors(err.response.data.errors)
            })
        setDisabled(false)
    }

    return (
        <section>
            <Toaster />
            <div className="title_container">
                <h1 className="text_gray">Cadastrar Amiguinho</h1>
            </div>

            <ErrorCard errors={errors} />
            <div className={registerPetStyle.images_container}>
                
                 {preview.length > 0 ?
                    (preview.map((image, index) => {
                        return (<img src={URL.createObjectURL(image)} key={pet.name + index} alt={pet.name} />)
                    })) :
                    (pet.images ?
                        (pet.images.map((image, index) => {
                            return <img src={`${import.meta.env.VITE_APP_API}/images/pets/${image}`} key={pet.name + index} alt={pet.name} />
                        })) : <></>)
                }
            </div>
            <form method="post" className={style.form_container} onSubmit={handleSubmit}>
                <Input
                    text="Imagens"
                    type="file"
                    name="images"
                    multiple={true}
                    handleOnChange={handleFiles}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o nome do seu pet"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Idade"
                    type="text"
                    name="age"
                    placeholder="Digite a idade do seu pet"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Cor"
                    type="text"
                    name="color"
                    placeholder="Digite a cor do seu pet"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Peso"
                    type="text"
                    name="weigth"
                    placeholder="Digite o peso do seu Pet"
                    handleOnChange={handleOnChange}
                />

                <SubmitButton value='Cadastrar' disabled={disabled} />

            </form>

        </section>
    )
}

export default RegisterPet;