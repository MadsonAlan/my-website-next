import axios from "axios"
import Head from "next/head"
import React from "react"
import { GithubProject } from "../../config/interfaces"
import styles from '../../styles/techs.module.css'

const FilterArray = import('../../config/uniqueValueArray')
interface Props {
    repoData: GithubProject[],
    lang: string
}
function ProjectsOfTech({ lang, repoData }: Props) {


    console.log(lang, repoData);

    return (
        <div>
            <Head>
                <title>Home | Madson Alan</title>
                {/* <title>Home | {userShortName}</title> */}
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>

                <img className={styles.avatar}
                    // src={userData.avatar_url} 
                    src="https://avatars.githubusercontent.com/u/45024414?v=4"
                />
                <h1 className={styles.title}>
                    Madson Alan
                    {/* {userShortName} */}
                </h1>
                <div className={styles.grid}>
                    <div className={styles.grid}>
                        <div className={styles.cardLang}>
                            <h3 className={styles.code}>{lang ? lang : 'outros'}</h3>
                            <div className={styles.grid}>
                                {repoData?.map((projeto) => {
                                    console.log(projeto);

                                    if (lang === projeto.language) {
                                        return (<a key={projeto.id} href={projeto.html_url} className={styles.card}>
                                            <h3>{projeto.name} &rarr;</h3>
                                            <h4>{projeto.language ? projeto.language : 'outros'}</h4>
                                            <p>{projeto.description?.substr(0, 200)}...</p>
                                        </a>)
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                {/* <a
    href={userData.html_url}
    target="_blank"
    rel="Github do Madson"
  > */}
                {/* Desenvolvido por {userShortName} */}
                {/* </a> */}
            </footer>
        </div>
    )
}

export async function getStaticPaths() {
    let contador = 0
    const rep = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}/repos`
        // ,{
        //   headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        // }
    )
    const dataRepos: GithubProject[] = await rep.data

    let langProj: string[] = []
    dataRepos.map((projeto) => {
        langProj.push(projeto.language)
    })
    const languages = (await FilterArray).default(dataRepos)
    const paths = languages.map((lang) => {
        contador++
        return ({
            params: { id: contador.toString() }
        }
        )
    })
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    console.log(params.id);



    const rep = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}/repos`
        // ,{
        //   headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        // }
    )
    const dataRepos: GithubProject[] = await rep.data

    let langProj: string[] = []
    dataRepos.map((projeto) => {
        langProj.push(projeto.language)
    })
    const languages = (await FilterArray).default(dataRepos)

    return {
        props: {
            repoData: dataRepos,
            lang: languages[(params.id - 1)]
        }, // will be passed to the page component as props
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 60 * 60 * 24 * 30, // In seconds
    }
}



export default ProjectsOfTech