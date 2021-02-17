import Link from 'next/link';
import classnames from 'classnames';
import styles from '../styles/components/Button.module.scss';

const Button = ({ children, color, href, full, onClick }) => {
    const className = classnames(styles.button, {
        [styles.blue]: color === 'blue',
        [styles.white]: color === 'white',
        [styles.full]: full,
    });

    if (!href && !onClick) {
        return <input className={className} type="submit" value={children} />;
    }

    const handleClick = e => {
        if (!onClick) return;
        e.preventDefault();
        onClick(e);
    }

    const anchor = (
        <a className={className} onClick={handleClick}>
            {children}
        </a>
    );

    return href ? <Link href={href}>{anchor}</Link> : anchor;
};

Button.defaultProps = {
    color: 'white',
};

export default Button;
