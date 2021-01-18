import Link from 'next/link';
import { connectToDatabase } from '../../util/mongodb';
import styles from '../../styles/common.module.css';

const TTL_MS = 1000 * 60 * 60 * 24 * 30;

export default function HostPage(props) {
    return (
        <div className={styles.container}>
            <h1>Hosting</h1>
            <span>Title: {props.title}</span>
            <span>Code: {props.code}</span>
            <Link href={'/join/' + props.code}>
                <a className={styles.link}>Join</a>
            </Link>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();

    const room = await db
        .collection('rooms')
        .findOne({
            code: context.params.code,
            createdAt: { $gt: Date.now() - TTL_MS },
        });

    return {
        props: {
            title: room.title,
            code: room.code,
        },
    };
}
