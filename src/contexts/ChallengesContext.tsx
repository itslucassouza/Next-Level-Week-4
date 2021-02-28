import { type } from 'os';
import { createContext, ReactNode, useEffect, useState } from 'react';
import chellenges from '../../challenges.json';

interface Chellenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface challengesContexData{
    level: number;
    currentExperience: number;
    chellengesCompleted: number;
    activeChellenges: Chellenge;
    levelUp: () => void;
    startNewChellenge: () => void;
    resetChellenge: () => void;
    completeChellenge: () => void;
    experienceToNextLevel: number;
}

//Todo componentne herdade recebe o tipo como reactNode
interface challengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as challengesContexData);

export function ChellengesProvider({children}: challengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [ chellengesCompleted, setChellengesCompleted] = useState(0);
    const [activeChellenges, setActiveChellenges] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])
    function levelUp() {
      setLevel(level + 1) 
    }

    function startNewChellenge() {
        const randomChellengeIndex = Math.floor(Math.random() * chellenges.length)
        const chellenge = chellenges[randomChellengeIndex]
        
        setActiveChellenges(chellenge);

        new Audio('/notification.mp3').play();
        
        if(Notification.permission === 'granted') {
            new Notification('Novo defaio', {
                body: `Valendo ${chellenge.amount} xp`
            })
        }
    }

    function resetChellenge() {
        setActiveChellenges(null)
    }

    function completeChellenge() {
        if(!activeChellenges){
            return
        }

        const { amount } = activeChellenges;


        //let it change (deixe isso mudar)
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChellenges(null)
        setChellengesCompleted(chellengesCompleted + 1)
    }

    return(
        <ChallengesContext.Provider 
        value={{
        level, 
        currentExperience, 
        chellengesCompleted,
        experienceToNextLevel,
        levelUp,
        startNewChellenge,
        activeChellenges,
        resetChellenge,
        completeChellenge,
    }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}


