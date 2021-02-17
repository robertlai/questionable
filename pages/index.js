import Button from 'components/Button';
import PageWrapper from 'components/PageWrapper';
import styles from 'styles/pages/index.module.scss';

const IndexPage = () => (
    <PageWrapper>
        <div className={styles.content}>
            <h1 className={styles.title}>Questionable</h1>
            <Button full color="white" href="/host">Host</Button>
            <Button full color="white" href="/join">Join</Button>
        </div>
    </PageWrapper>
);

export default IndexPage;
