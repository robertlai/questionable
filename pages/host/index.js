import styles from '../../styles/HostIndexPage.module.css';

export default function HostIndexPage() {
    return (
        <form action="/api/host" method="post">
            <div className={styles.container}>
                <h1>Host</h1>
                <input className={styles.input} name="title" placeholder="Title" />
                <input className={styles.link} type="submit" value="Host" />
            </div>
        </form>
    );
}
