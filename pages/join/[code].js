import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { connectToDatabase } from '../../util/mongodb';
import styles from '../../styles/JoinPage.module.css';

const POLL_PERIOD = 3000;
const TTL_MS = 1000 * 60 * 60 * 24 * 30;

export default function JoinPage(props) {
    const textInput = useRef(null);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await fetch('/api/submissions/get?roomCode=' + props.code);
            const body = await response.json();
            setSubmissions(body.submissions);
        }, POLL_PERIOD);

        return () => {
            clearInterval(interval);
        };
    });

    function handleSubmit() {
        const text = textInput.current.value;
        fetch('/api/submissions/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                roomCode: props.code,
                text: text,
            }),
        });
    }

    return (
        <div className={styles.container}>
            <h1>{props.title}</h1>
            <span>Code: {props.code}</span>
            <ul>
                {submissions.map(submission => {
                    return (
                        <li key={submission.text + submission.createdAt}>
                            {submission.text}
                        </li>
                    );
                })}
            </ul>
            <input className={styles.input} name="text" placeholder="Text" ref={textInput} />
            <button className={styles.link} onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();

    const code = context.params.code;
    const room = await db
        .collection('rooms')
        .findOne({
            code: code,
            createdAt: { $gt: Date.now() - TTL_MS },
        });

    return {
        props: {
            title: room.title,
            code: room.code,
        },
    };
}