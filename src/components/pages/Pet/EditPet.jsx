import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import style from '../../form/Form.module.css'
import editPetStyle from './Pet.module.css'
import { useEffect, useState } from "react";
import ErrorCard from "../../layout/ErrorCard";
import api from "../../../utils/api";
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from "react-router-dom";

const EditPet = () => {

    const { id: petId } = useParams()
    const [preview, setPreview] = useState([])
    const navigate = useNavigate()
    const [pet, setPet] = useState({})
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        api.get(`/pets/${petId}`)
            .then((res) => {
                setPet(res.data.pet)
            }).catch(() => {
                toast.error('Erro ao recuperar pet para edição.')
            })
    }, [petId])


    function handleOnChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    function handleFiles(e) {
        const images = [...e.target.files];
        setPet({ ...pet, images: images })
        setPreview(images)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setPet({ ...pet, images: pet.images })
        const formData = new FormData()
       
        Object.keys(pet).forEach(key => {

            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })
      

        api.patch(`/pets/${petId}`, formData)
            .then(() => {
                toast.success('Pet atualizado com sucesso.')
                navigate('/pets/mypets')
            }).catch(err => {

                if (err.response.data.errors) {
                    setErrors(err.response.data.errors)
                }

            })
        setDisabled(false)
    }

    return (
        <section>
            <Toaster />
         
            <div className="title_container">
                <h1 className="text_gray">Editar Pet</h1>
            </div>
            <ErrorCard errors={errors} />
            <div className={editPetStyle.images_container}>
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
                    value={pet.name ? pet.name : ''}
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Idade"
                    type="text"
                    name="age"
                    value={pet.age ? pet.age : ''}
                    placeholder="Digite a idade do seu pet"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Cor"
                    type="text"
                    name="color"
                    value={pet.color ? pet.color : ''}
                    placeholder="Digite a cor do seu pet"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Peso"
                    type="text"
                    name="weigth"
                    value={pet.weigth ? pet.weigth : ''}
                    placeholder="Digite o peso do seu Pet"
                    handleOnChange={handleOnChange}
                />

                <SubmitButton value='Atualizar' disabled={disabled} />

            </form>

        </section>
    )
}

export default EditPet;