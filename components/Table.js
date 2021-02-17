import { useContext } from 'react';
import styles from 'styles/components/Table.module.scss';

const Table = ({ headers, data }) => (
    <table className={styles.table}>
        {headers && (
            <thead>
                <tr>
                    {headers.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
        )}
        <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                    {row.map(item => (
                        <td key={item}>{item}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export default Table;
