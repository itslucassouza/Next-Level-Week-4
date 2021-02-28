import { type } from 'os';
import { createContext, ReactNode, useEffect, useState } from 'react';
import chellenges from '../../challenges.json';
import Cookie from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';



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
    closeLevelUpModal: () => void;
    experienceToNextLevel: number;
}

//Todo componentne herdade recebe o tipo como reactNode
interface challengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as challengesContexData);

export function ChellengesProvider({children ,
    ...rest
}: challengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0 );
    const [ chellengesCompleted, setChellengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChellenges, setActiveChellenges] = useState(null); 
    const[isLevelModalOpen, setIsLevelModalOpen] = useState(false)
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Cookie.set('level', String(level))
        Cookie.set('CurrentExperience', String(level))
        Cookie.set('challengesCompleted ', String(level))
    }, [level, currentExperience, chellengesCompleted])

    useEffect(() => {
        Notification.requestPermission();
    }, [])
    function levelUp() {
      setLevel(level + 1)
      setIsLevelModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelModalOpen(false);
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
        closeLevelUpModal,
    }}
        >
            {children}
            {
                isLevelModalOpen &&
                <LevelUpModal />
            }
        </ChallengesContext.Provider>
    )
}


