import styles from '../styles/Button.module.css'

export function Button({ text, subtext, onclick, grayed, grayedCallback }) {
    return (
        <div className={"buttonDiv"}>
            <button className={`button1 ${(grayed ? "grayed":"")}`} onClick={(grayed ? grayedCallback:onclick)}>
                <div>{text}</div>
                <div>{subtext}</div>
            </button>
        </div>
    )
}

export function Button2({ text, onclick }) {
    return (
        <button className={styles.button2} onClick={onclick} >{text}</button>
    )
}