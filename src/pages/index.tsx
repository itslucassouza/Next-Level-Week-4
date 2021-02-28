import styles from '../styles/pages/Home.module.css';

import {GetServerSideProps} from 'next';
import { CompleteChellenges } from '../components/CompleteChellenges';
import { CountDownProvider } from '../contexts/ContDownContext';
import {ExperienceBar} from '../components/ExperienceBar';
import {Profile} from '../components/Profile';
import { Countdown } from '../components/Countdown';

import Head from 'next/head';
import { ChallengeBox } from '../components/ChellengeBox';
import { ChellengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps ) {
  return (
    <ChellengesProvider 
    
    level={props.level}
    currentExperience={ props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >

    <div className={styles.container}>
      <Head>
        <title>Inicio</title>
      </Head>
      <ExperienceBar />

    <CountDownProvider>
      <section>
        <div>
          <Profile /> 
          <CompleteChellenges />
          <Countdown />
        </div>
        <div>
        <ChallengeBox />
        </div>
      </section>
      </ CountDownProvider>
    </div>
    </ChellengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level , currentExperience, challengesCompleted} = ctx.req.cookies;
  
  return{
      props: {
        level: Number(level),
        currentExperience: Number(currentExperience),   
        challengesCompleted: Number(currentExperience),
      }
  }
  
}