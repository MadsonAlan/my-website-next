import axios from "axios"
import Head from "next/head"
import React from "react"
import { GithubProject } from "../../config/interfaces"
import styles from '../../styles/techs.module.css'
import { useRouter } from 'next/router'


const FilterArray = import('../../config/uniqueValueArray')


import techsAndOthers from '../../pages/api/techsAndOthers.json'
import FooterPage from "../../components/footerPage/footerPage"
interface Props {
    repoData: GithubProject[],
    lang: string
}
function ProjectsOfTech({ lang, repoData }: Props) {
    const router = useRouter()
    // console.log(lang, repoData);

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
                        Esses foram os projetos que desenvolvi usando {lang}
                    </h3>
                    <div className={styles.gridCards}>
                        {repoData?.map((projeto) => {
                            // console.log(projeto);

                            if (lang === projeto.language) {
                                return (
                                    <a key={projeto.id} href={projeto.html_url} className={styles.card}>
                                        <h3>{projeto.name} &rarr;</h3>
                                        <h4>{projeto.language ? projeto.language : 'outros'}</h4>
                                        <p>{projeto.description?.substr(0, 200)}...</p>
                                    </a>
                                )
                            }
                        })}
                    </div>
                    <div className={styles.buttonArea}>
                        <div className={styles.buttonReturn} onClick={() => router.back()}>
                            <p>Voltar</p>
                        </div>
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

export async function getStaticPaths() {
    const rep = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}/repos`
        // , {
        //     headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        // }
    )
    const dataRepos: GithubProject[] = await rep.data

    let langProj: string[] = []
    dataRepos.map((projeto) => {
        langProj.push(projeto.language)
    })
    const languages = (await FilterArray).default(dataRepos)
    const paths = languages.map((lang, index) => {
        return ({
            params: { id: index.toString() }
        }
        )
    })
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    // console.log(params.id);



    const rep = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}/repos`
        // , {
        //     headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
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
            lang: languages[params.id]
        }, // will be passed to the page component as props
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 60 * 60 * 24 * 7, // In seconds
    }
}



export default ProjectsOfTech