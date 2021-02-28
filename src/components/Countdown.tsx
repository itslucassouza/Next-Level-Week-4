import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import {CountDownContext} from '../contexts/ContDownContext';



export function Countdown() {
    const {minutes, 
        seconds, 
        hasFinish, 
        isActive, startCountDown, resetCountDown} = useContext(CountDownContext)

    //string transforma o dado em string
    //padStart corta o elemento, o primeiro parametro é em quantas vezes o dados vai ser repartido
    // o segundo é a informação que vai ser alocada caso tenha um dado só
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    
    return(
        <div>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span> 
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>
        </div>
        { hasFinish ? (
            <button 
            disabled
            className={styles.countdownButton}
            > Ciclo encerrado   
            </button>
        ) : (
            <>
            { isActive ? (
                <button 
                type="button" 
                onClick={resetCountDown} 
                className={`${styles.countdownButton} ${styles.countDownButtonActive}`}
                > Abandonar Ciclo
                </button>
                ) : 
                <button 
                type="button" 
                onClick={startCountDown} 
                className={styles.countdownButton}
                > Iniciar Ciclo
                </button>
                }
                </>
        )} 

        


        
        </div>
    )
}