import Head from 'next/head'
import Cookies from 'js-cookie'
import axios from 'axios'
import React from 'react'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import ProjectsOfTech from '../components/projectsGithub/projectsOfTech'
import { GithubDataUser, GithubProject } from '../config/interfaces'
import UserProfile from '../components/profileGithub/userProfile'
import FooterPage from '../components/footerPage/footerPage'
const FilterArray = import('../config/uniqueValueArray')

// interface Props {
//   userData: GithubDataUser,
//   repoData: GithubProject[],
//   languages: string[]
// }

// function Home({ userData, repoData, languages }: Props) {
function Home() {

  let contador = 0
  const languages = ['C#', 'Dart', 'Javascript']


  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Madson Alan</title>
        {/* <title>Home | {userShortName}</title> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.topItens}>
          <img className={styles.avatar}
            // src={userData.avatar_url} 
            src="https://avatars.githubusercontent.com/u/45024414?v=4"
          />
          <div className={styles.leftTexts}>
            <h1 className={styles.title}>
              Madson Alan
              {/* {userShortName} */}
            </h1>

            <p className={styles.description}>
              Programador full stack | Web e mobile | Amante de front-end e novas tecnologias
              {/* {userData.bio} */}
            </p>
          </div>

        </div>

        <p className={styles.languages}>
          Possuo experiência com:
        </p>
        {/* <UserProfile key='1' userData={userData} userShortName={userShortName} /> */}

        <div className={styles.grid}>
          {
            languages.map(lang => {
              contador++
              return (
                <div className={styles.card}>
                  <Link href={`/tech/${contador.toString()}`}
                    as={`/tech/${lang}`}
                  >
                    <a >
                      <h3>{lang}📚 &rarr;</h3>
                      <p>Clique e veja meus projetos usando {lang}</p>
                    </a>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </main>

      <FooterPage />
    </div>
  )
}


// export async function getStaticProps() {

//   const rep = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}/repos`)
//   const dataRepos: GithubProject[] = await rep.data

//   let langProj: string[] = []
//   dataRepos.map((projeto) => {
//     langProj.push(projeto.language)
//   })
//   const languages = (await FilterArray).default(dataRepos)
//   return {
//     props: {
//       repoData: dataRepos,
//       languages: languages,
//     }, 
//     revalidate: 60 * 60 * 24 * 15, // In seconds
//   }
// }

export default Home