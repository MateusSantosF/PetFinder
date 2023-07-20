import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import toast, { Toaster } from 'react-hot-toast'
import style from './MyPets.module.css'
const MyAdoptions = () => {


    const [pets, setPets] = useState([])

    useEffect(() => {
        api.get('/pets/myadoptions').then(res => {
            console.log(res.data)
            setPets(res.data.pets)
        }).catch(() => {
            toast.error('Erro ao recuperar seus pets')
        })
    }, [])

    async function deletePet(id) {
        api.delete(`pets/${id}`)
            .then(() => {
                toast.success('Pet removido com sucesso!')
                setPets(pets.filter(pet => {
                    return pet._id != id
                }))
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <section>

            <div className={style.container}>
                <h1 className="text_gray">Minhas adoções</h1>
                <Link to='/' className={style.register_pet_button}>Adotar pet</Link>
            </div>
            <Toaster />
            <div className={style.pets_container}>
                {pets.length > 0 && (pets.map((pet, index) => {
                    return <div key={index + pet.name} >
                        <img src={`${import.meta.env.VITE_APP_API}/images/pets/${pet.images[0]}`} />
                        <h2 className="bold">{pet.name}</h2>
                        <div className='text_center'>
                           <h4>Ligue para: <span className="text_green">{pet.user.phone}</span> e fale com <span className="text_green">{pet.user.name}</span></h4>
                        </div>
                    </div>
                }))}
                {pets.length === 0 && (<p>Você ainda não adotou nenhum companheiro 😥</p>)}
            </div>
        </section>
    )
}

export default MyAdoptions;