import style from './Input.module.css'

const SubmitButton = ({ value, disabled }) => {
    return (
        <div className={style.submitButton}>
            <input 
                className={disabled ? style.disabled : ''}
                type='submit'
                value={value}
                disabled={disabled}
            />
        </div>
    )
}

export default SubmitButton;