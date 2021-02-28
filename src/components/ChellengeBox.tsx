import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/ContDownContext';
import styles from '../styles/components/challengeBox.module.css';

export function ChallengeBox() {
    const {activeChellenges, resetChellenge, completeChellenge} = useContext(ChallengesContext);
    const {resetCountDown} = useContext(CountDownContext)

    function handleChallengeSucceded() {
        completeChellenge();
        resetCountDown();
    }

    function handleChallengeFailed() {
        resetChellenge();
        resetCountDown();

    }

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChellenges ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChellenges.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChellenges.type}.svg`}/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChellenges.description}</p>
                    </main>

                    <footer>
                        <button 
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}>
                        Falhei
                        </button>
                        
                        <button 
                        type="button"
                        className={styles.challengeSuccededButton}
                        onClick={handleChallengeSucceded}
                        >
                        Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <>  
                <div className={styles.chellengeNotActive}>
                <strong>Finalize um ciclo para receber desafios </strong>
                <p>
                    <img src="icons/level-up.svg" alt="level up" />
                    Avance de level completando desafios
                </p>
            </div>
                </>
            )}
        </div>
    )
}