import styles from 'styles/components/PageWrapper.module.scss';

const PageWrapper = ({ children }) => (
    <div className={styles.pageWrapper}>
        {children}
    </div>
);

export default PageWrapper;
