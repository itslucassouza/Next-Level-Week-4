import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompleteChellenges.module.css';

export function CompleteChellenges() {

    const {chellengesCompleted} = useContext(ChallengesContext)
    return(
        <div className={styles.completeChellengesContainer}>
            <span>Desafios Completos</span>
            <span>{chellengesCompleted}</span>
        </div>
    )
}