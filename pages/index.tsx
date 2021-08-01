import Head from 'next/head'
import axios from 'axios'
import React from 'react'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import ProjectsOfTech from '../components/projectsGithub/projectsOfTech'
import { GithubDataUser, GithubProject } from '../config/interfaces'
import UserProfile from '../components/profileGithub/userProfile'
import FooterPage from '../components/footerPage/footerPage'
const FilterArray = import('../config/uniqueValueArray')


import techsAndOthers from '../pages/api/techsAndOthers.json'

interface Props {
  userData: GithubDataUser,
  repoData: GithubProject[],
  languages: string[]
}

function Home({ userData, repoData, languages }: Props) {
// function Home() {

  // const languages = ['C#', 'Dart', 'Javascript']
  let nomeHead = userData.name.split(' ')
  const userShortName = nomeHead[0] + ' ' + nomeHead[1]
  return (
    <div>
      <Head>
        <title>Home | Madson Alan</title>
        {/* <title>Home | {userShortName}</title> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.sectionTopItens}>
        <div className={styles.topItens}>

          <div className={styles.container}>
            <div>
              <h2>
                {/* Madson Alan */}
                {userShortName}
              </h2>

              <p >
                {/* Programador full stack | Web e mobile | Amante de front-end e novas tecnologias */}
                {userData.bio}
              </p>
            </div>
            <img
              src={userData.avatar_url} 
              // src="https://avatars.githubusercontent.com/u/45024414?v=4"
            />
          </div>
        </div>
      </section>
      <main className={styles.main}>
        <section className={styles.myProjects}>
          <h3>Meus projetos já publicados</h3>
          <div>
            <a href="https://moveit-madsonalan.vercel.app/" target="_blank">
            <img src='./projects/ScreenshotProjectRunning.jpg' alt="moveit project"/>
            <div>
              <strong>Moveit</strong>
              <p>Aplicação voltada para exercícios durante o periodo de trabalho.</p>
            </div>
            </a>
          </div>
        </section>

        {/* <UserProfile key='1' userData={userData} userShortName={userShortName} /> */}
        <section className={styles.gridTechs}>
          <h3 className={styles.languages}>
            Possuo experiência com as linguagens:
          </h3>
          <div className={styles.gridCards}>
            {
              languages.map((lang, index) => {
                let qtdProjects = repoData.filter(item => {if(item.language == lang){ return item}})
                return (
                  <Link key={index} href={`/tech/${index.toString()}`}
                  >
                    <a >
                      <div className={styles.card}>
                        <h3>{lang} &rarr;</h3>
                        <p>Clique no card e veja o que já desenvolvi usando {lang}</p>
                        <div className={styles.dataProjects}>
                          <p>{qtdProjects.length} {qtdProjects.length>1?"projetos":"projeto"}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                )
              })
            }
          </div>
        </section>
        <section className={styles.techsAndOthers}>
          <h3 className={styles.languages}>
            Também sei utilizar:
          </h3>
          <div className={styles.slider}>
            <div className={styles.slideTrack}>
              {techsAndOthers.map(item => {
                return (
                  <div key={item.image} className={styles.slide}>
                    <a href={item.url}>
                      <img src={item.image} />
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <FooterPage />
    </div>
  )
}


export async function getStaticProps() {

  const rep = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}/repos`)
  const dataRepos: GithubProject[] = await rep.data

  let langProj: string[] = []
  dataRepos.map((projeto) => {
    langProj.push(projeto.language)
  })
  const languages = (await FilterArray).default(dataRepos)


  const res = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}`)

  const githubData = await res.data
  // const githubData: GithubDataUser = await res.data

  if (!githubData) {
    return {
      notFound: true,
    }
  }


  return {
    props: {
      userData: githubData,
      repoData: dataRepos,
      languages: languages,
    },
    revalidate: 60 * 60 * 24 * 7, // In seconds
  }
}

export default Home