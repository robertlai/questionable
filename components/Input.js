import styles from 'styles/components/Input.module.scss';

const Input = ({ name, placeholder, tagRef }) => (
    <input className={styles.input} name={name} placeholder={placeholder} ref={tagRef} />
);

export default Input;
