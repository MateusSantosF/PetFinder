import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import toast, { Toaster } from 'react-hot-toast'
import style from './MyPets.module.css'


const MyPets = () => {

    const [pets, setPets] = useState([])

    useEffect(() => {
        api.get('/pets/mypets').then(res => {
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

    async function concludeAdoptions(id) {
        api.patch(`/pets/conclude/${id}`)
        .then(() => {
            toast.success('Adoção finalizada com sucesso!')
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
                <h1 className="text_gray">Meus Pets</h1>
                <Link to='/pets/register' className={style.register_pet_button}>Cadastrar pet</Link>
            </div>
            <Toaster />
            <div className={style.pets_container}>
                {pets.length > 0 && (pets.map((pet, index) => {
                    return <div key={index + pet.name} >
                        <img src={`${import.meta.env.VITE_APP_API}/images/pets/${pet.images[0]}`} />
                        <h2 className="bold">{pet.name}</h2>
                        <div className={style.actions}>
                            {pet.available ? (
                                <>
                                    <div>
                                    <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                                    <a onClick={() => deletePet(pet._id)}>Excluir</a>
                                    </div>
                                    {pet.adopter && (
                                        <a onClick={()=>concludeAdoptions(pet._id)}>Concluir Adoção</a>
                                    )}
                                </>
                            ) : <p className={style.adopted}>Adotado.</p>}
                        </div>
                    </div>
                }))}
                {pets.length === 0 && (<p>Não há pets cadastrados</p>)}
            </div>
        </section>
    )
}

export default MyPets;