import style from './Input.module.css'

const Input = ({ type, text, name, placeholder, handleOnChange, value, multiple }) => {
    return (
        <div className={style.formControll}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type}
                value={value}
                name={name}
                id={name}
                onChange={handleOnChange}
                placeholder={placeholder} 
                {...(multiple ? {multiple} : '')}
            />
        </div>
    )
}

export default Input;