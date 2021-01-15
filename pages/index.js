import Link from 'next/link';
import styles from '../styles/IndexPage.module.css';

export default function IndexPage() {
    return (
        <div className={styles.container}>
            <h1>Questionable</h1>
            <Link href="/host">
                <a className={styles.link}>Host</a>
            </Link>
            <Link href="/join">
                <a className={styles.link}>Join</a>
            </Link>
        </div>
    );
}
