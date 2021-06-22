import React from "react"
import { GithubProject } from "../../config/interfaces"
import styles from '../../styles/projectsOfTech.module.css'
interface Props {
    repoData: GithubProject[],
    languages: string[]
}
function ProjectsOfTech({ languages, repoData }: Props) {
    return (
        <div className={styles.grid}>
            {languages.map(lang => {
                return (
                    <div className={styles.grid}>
                        <div className={styles.cardLang}>
                            <h3 className={styles.code}>{lang ? lang : 'outros'}</h3>
                            <div className={styles.grid}>
                                {repoData.map((projeto) => {
                                    if (lang === projeto.language) {
                                        return (<a key={projeto.id} href={projeto.html_url} className={styles.card}>
                                            <h3>{projeto.name} &rarr;</h3>
                                            <h4>{projeto.language ? projeto.language : 'outros'}</h4>
                                            <p>{projeto.description.substr(0,200)}...</p>
                                        </a>)
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProjectsOfTech