import axios from "axios"
import Head from "next/head"
import React from "react"
import { GithubDataUser, GithubProject } from "../../config/interfaces"
import styles from "../../styles/userProfile.module.css"
interface Props {
    userData: GithubDataUser,
    children: React.ReactNode
}
function UserProfile({ userData, children }: Props) {
    let nomeHead = userData.name.split(' ')
    const userShortName = nomeHead[0] + ' ' + nomeHead[1]
    return (
        <div>
            <img className={styles.avatar}
                src={userData.avatar_url}
            />
            <h1 className={styles.title}>
                {userShortName}
            </h1>

            <p className={styles.description}>
                {userData.bio}
            </p>
        </div>
    )
}

export async function getStaticProps() {

    const res = await axios.get(`https://api.github.com/users/${process.env.USER_GITHUB}`)

    const githubData: GithubDataUser = await res.data

    if (!githubData) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            userData: githubData,
        },
        revalidate: 60 * 60 * 24 * 25, // In seconds
    }
}

export default UserProfile