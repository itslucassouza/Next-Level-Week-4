import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface countDownContextData {
    minutes: number;
    seconds: number;
    hasFinish: boolean;
    isActive: boolean; 
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountDownProviderProps{
    children: ReactNode;
    }

export const CountDownContext = createContext({} as countDownContextData);

let countdownTimeOut: NodeJS.Timeout;

export function CountDownProvider({children}: CountDownProviderProps) {
    const {startNewChellenge} = useContext(ChallengesContext);


    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinish, setHasFinish] = useState(false)

    //meth.flor arredonda o numero para baixo
    const minutes = Math.floor(time / 60);
    //o resto da divisão
    const seconds = time % 60;

    function startCountDown() {
        setIsActive(true);
    }

    function resetCountDown() {
        clearTimeout(countdownTimeOut)
        setIsActive(false);
        setHasFinish(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if(isActive && time == 0){
            setHasFinish(true)
            setIsActive(false)
            startNewChellenge();
        }
    }, [isActive, time])

    return(
        <CountDownContext.Provider value={{
            minutes,
            seconds,hasFinish, isActive, startCountDown, resetCountDown,
        }}>
            {children}
        </CountDownContext.Provider>
    )
}