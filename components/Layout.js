import styles from '../styles/Layout.module.css'

export default function Layout({ children, backFunction, disableOverflowProtection }) {
    return (
        <div style={{height: "100%", overflowY: (!disableOverflowProtection ? "hidden":"none")}}>
            <button className={styles.back} onClick={backFunction}>
                {"<-- Go back"}
            </button>
            <div className={styles.container}> { children } </div>
        </div>
    )
}