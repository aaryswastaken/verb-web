import styles from '../styles/Popup.module.css'

function Popup({ children, style }) {
    return (
        <div className={styles.container}>
            <div className={styles.frame}>
                {children}
            </div>
        </div>
    )
}

function PButton({ text, grayed, onClick }) {
    return (
        <button className={`${styles.defaultPButton} ${grayed ? styles.grayed:"" }`} onClick={(grayed ? ()=>{}:onClick)}> {text} </button>
    )
}

export { Popup, PButton };