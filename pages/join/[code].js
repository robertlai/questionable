import { useEffect, useRef, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import PageWrapper from 'components/PageWrapper';
import { TTL_MS } from 'util/constants';
import { connectToDatabase } from 'util/mongodb';
import styles from 'styles/pages/join/[code].module.scss';

const POLL_PERIOD = 1000;

const JoinPage = ({ code, title }) => {
    const textInput = useRef(null);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await fetch('/api/submissions/get?roomCode=' + code);
            const body = await response.json();
            setSubmissions(body.submissions);
        }, POLL_PERIOD);

        return () => clearInterval(interval);
    });

    const handleSubmit = () => {
        const text = textInput.current.value;
        fetch('/api/submissions/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                roomCode: code,
                text: text,
            }),
        });
    };

    return (
        <PageWrapper>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>{title}</h1>
                    <span>Code: {code}</span>
                </div>
                <div className={styles.submissionsContainer}>
                    {submissions.map((submission) => (
                        <div key={submission.text + submission.createdAt} className={styles.submission}>
                            {submission.text}
                        </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <Input name="text" placeholder="Text" tagRef={textInput} />
                    <Button color="blue" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </PageWrapper>
    );
};

export default JoinPage;

export const getServerSideProps = async context => {
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
};
