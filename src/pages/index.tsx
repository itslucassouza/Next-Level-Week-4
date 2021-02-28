import styles from '../styles/pages/Home.module.css';
import { CompleteChellenges } from '../components/CompleteChellenges';
import { CountDownProvider } from '../contexts/ContDownContext';
import {ExperienceBar} from '../components/ExperienceBar';
import {Profile} from '../components/Profile';
import { Countdown } from '../components/Countdown';

import Head from 'next/head';
import { ChallengeBox } from '../components/ChellengeBox';

export default function Home() {
  return (
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
  )
}
