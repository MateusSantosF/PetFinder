
import { useEffect, useState } from "react";
import api from "../../utils/api";
import style from './Home.module.css'
import { Link } from "react-router-dom";
const Home = () =>{

    const [pets, setPets] = useState([])

    useEffect(()=>{
        api.get('/pets').then(res=>{
            setPets(res.data.pets)
        })
    },[])

    return (
        <section>

            <div className="title_container">
                <h1 className="text_gray">Adote um companheiro!</h1>
            </div>
            <div className={style.pets_container}>

            {pets && pets.map((pet, key)=>{
                return <div className={style.petcard} key={key}>
                    <img  src={ `${import.meta.env.VITE_APP_API}/images/pets/${pet.images[0]}`}/>
                        <h2 className="bold">{pet.name}</h2>
                        <h4 className="bold">Peso: {pet.weigth}kg</h4>
                        {pet.adopter ?
                            (pet.available 
                                ? <Link to={`pets/${pet._id}`}>Detalhes</Link> 
                                :  <h4 className={style.adopted}>Adotado</h4>
                            )
                            :
                            <Link to={`pets/${pet._id}`}>Detalhes</Link> 
                         }
                </div>
            })}

            </div>
        </section>
    )
}

export default Home;