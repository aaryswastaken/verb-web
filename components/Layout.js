import styles from '../styles/Layout.module.css'

export default function Layout({ children, backFunction }) {
    return (
        <div style={{height: "100%", overflowY: "hidden"}}>
            <button className={styles.back} onClick={backFunction}>
                {"<-- Go back"}
            </button>
            <div className={styles.container}> { children } </div>
        </div>
    )
}