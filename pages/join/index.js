import styles from '../../styles/JoinIndexPage.module.css';

export default function JoinIndexPage() {
    return (
        <form action="/api/join" method="get">
            <div className={styles.container}>
                <h1>Join</h1>
                <input className={styles.input} name="code" placeholder="Code" />
                <input className={styles.link} type="submit" value="Join" />
            </div>
        </form>
    );
}
