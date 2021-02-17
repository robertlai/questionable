import styles from 'styles/components/Form.module.scss';

const Form = ({ action, children, method }) => (
    <form className={styles.form} action={action} method={method}>
        {children}
    </form>
);

export default Form;
