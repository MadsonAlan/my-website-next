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


import techsAndOthers from '../pages/api/techsAndOthers.json'

// interface Props {
//   userData: GithubDataUser,
//   repoData: GithubProject[],
//   languages: string[]
// }

// function Home({ userData, repoData, languages }: Props) {
function Home() {

  const languages = ['C#', 'Dart', 'Javascript']

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
                Madson Alan
                {/* {userShortName} */}
              </h2>

              <p >
                Programador full stack | Web e mobile | Amante de front-end e novas tecnologias
                {/* {userData.bio} */}
              </p>
            </div>
            <img
              // src={userData.avatar_url} 
              src="https://avatars.githubusercontent.com/u/45024414?v=4"
            />
          </div>
        </div>
      </section>
      <main className={styles.main}>

        {/* <UserProfile key='1' userData={userData} userShortName={userShortName} /> */}
        <section className={styles.gridTechs}>
          <h3 className={styles.languages}>
            Possuo experiência com as linguagens:
          </h3>
          <div className={styles.gridCards}>
            {
              languages.map((lang, index) => {
                return (
                  <Link href={`/tech/${index.toString()}`}
                  >
                    <a >
                      <div className={styles.card}>
                        <h3>{lang}📚 &rarr;</h3>
                        <p>Clique no card e veja o que já desenvolvi usando {lang}</p>
                        <div className={styles.dataProjects}>
                          <p>2 projetos</p>
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