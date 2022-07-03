import Head from 'next/head'
import axios from 'axios'
import React from 'react'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import ProjectsOfTech from '../components/projectsGithub/projectsOfTech'
import { GithubDataUser, GithubProject } from '../config/interfaces'
import UserProfile from '../components/profileGithub/userProfile'
import FooterPage from '../components/footerPage/footerPage'
import {MdFolder} from 'react-icons/md'
const FilterArray = import('../config/uniqueValueArray')


import techsAndOthers from './api/techsAndOthers.json'
import myProjects from './api/myProjects.json'

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
            <img alt='Foto Perfil Github'
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
            {
              myProjects.map((project) => {
                return (
                  <a href={project.address} target="_blank">
                    <img src={project.screenshot} alt="moveit project" />
                    <div>
                      <span>{project.tittle}</span>
                      <p>{project.description}</p>
                    </div>
                  </a>
                )
              })
            }
          </div>

        </section>

        {/* <UserProfile key='1' userData={userData} userShortName={userShortName} /> */}
        <section className={styles.gridTechs}>
          <h3 className={styles.languages}>
            Possuo experiência com:
          </h3>
          <div className={styles.gridCards}>
            {
              languages.map((lang, index) => {
                let qtdProjects = repoData.filter(item => { if (item.language == lang) { return item } })
                return (
                  <Link key={index} href={`/tech/${index.toString()}`}
                  >
                    <a >
                      <div className={styles.card}>
                        <div className={styles.dataProjects}>
                        <h3><MdFolder/></h3>
                        <h3>{lang??'Outros'}</h3>
                        <p>{qtdProjects.length} {qtdProjects.length > 1 ? "projetos" : "projeto"}</p>
                        </div>
                        <p className={styles.description}>Clique no card e veja {lang ?`o que já desenvolvi usando ${lang}`:'outros projetos no meu github'}</p>
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
                      <img alt='Tecnologias' src={item.image} />
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

  const rep = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}/repos`
  , {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
  }
  )
  const dataRepos: GithubProject[] = await rep.data

  let langProj: string[] = []
  dataRepos.map((projeto) => {
    langProj.push(projeto.language)
  })
  const languages = (await FilterArray).default(dataRepos)


  const res = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}`
  , {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
  }
  )

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