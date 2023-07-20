
import style from './PetDetails.module.css'

import { useEffect, useState } from "react";

import ErrorCard from '../../layout/ErrorCard';
import api from "../../../utils/api";
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';

const PetDetails = () => {

    const {isAuthenticated} = useUserContext()
    const { id: petId } = useParams()
    const [errors, setErrors] = useState([])

    const [pet, setPet] = useState({})


    useEffect(() => {
        api.get(`/pets/${petId}`)
            .then((res) => {
                setPet(res.data.pet)
            }).catch(() => {
                toast.error('Erro ao recuperar pet')
            })
    }, [petId])
    
    async function schedule(){
        api.patch(`/pets/schedule/${petId}`)
        .then(()=>{
            toast.success('Visita solicitada com sucesso!')
        }).catch((err)=>{
            if (err.response.data.errors) {
                setErrors(err.response.data.errors)
            }
        })
    }

    return (
        <section>
            <Toaster />
            <ErrorCard errors={errors} />
            <div className="title_container">
                <h1 className="text_gray">Oi, me chamo <span className='text_green'>{pet?.name}</span>!</h1>
                <p className={style.subtitle}>Você quer me adotar?</p>
            </div>
            <div className={style.images_container}>
                {pet.images ?
                    (pet.images.map((image, index) => {
                        return <img src={`${import.meta.env.VITE_APP_API}/images/pets/${image}`} key={pet.name + index} alt={pet.name} />
                    })) : <></>
                }
            </div>
            <div className='title_container'>
                <h3 className="text_gray">Peso: <span className='text_green'>{pet?.weigth} kg</span></h3>
                <h3 className="text_gray">Cor: <span className='text_green'>{pet?.color}</span></h3>
                {petId && <button className={style.visit_button} onClick={()=>{schedule()}}>Solicitar Visita</button>}
                {!isAuthenticated && <p>
                    Você precisa de uma <Link to='/register'>conta</Link> para solicitar uma visita! 
                </p>}
            </div>
           
        </section>
    )
}

export default PetDetails;