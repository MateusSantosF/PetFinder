import { useEffect, useState } from "react";
import style from './ErrorCard.module.css'
const ErrorCard = ({ errors }) => {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (errors.length == 0) {
            setIsVisible(false)
            return;
        }
        setIsVisible(true);
        console.log(errors)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000)

        return () => clearTimeout(timer);
    }, [errors])

    return (
        isVisible &&
        <div className={style.error_container}>
            <ul>
                {errors.map((msg, i) => {
                    return <li key={i}>{msg.msg}</li>
                })}
            </ul>

        </div>
    )
}

export default ErrorCard;