import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Cookies from 'js-cookie'
// import api from './api/Index'
function Home(props) {
  // console.log(props.repositorios);
  let nomeHead = props.usuario.name.split(' ')
  const userData = props.usuario
  const repoData = props.repositorios
  const linguagens = props.linguagens
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | {nomeHead[0] + ' ' + nomeHead[1]}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img className={styles.avatar} src={userData.avatar_url}/>
        <h1 className={styles.title}>
          {nomeHead[0] + ' ' + nomeHead[1]}
        </h1>

        <p className={styles.description}>
          {userData.bio}
        </p>
        <p className={styles.languages}>
          Possuo experiência com:
        </p>
        <p className={styles.code}>
        {linguagens.map(lang =>{
          if(lang != null)
          return ' - ' + lang + ' - '
        })}  
        </p>

        <div className={styles.grid}>
          {repoData.map((projeto) => {
            return(<a key={projeto.id} href={projeto.html_url} className={styles.card}>
              <h3>{projeto.name} &rarr;</h3>
              <h4>{projeto.language}</h4>
              <p>{projeto.description}</p>
            </a>)
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href={userData.html_url}
          target="_blank"
          rel="Github do Madson"
        >
          Desenvolvido por {nomeHead[0] + ' ' + nomeHead[1]}
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const usuarioGitHub = 'madsonalan'

  const res = await fetch(`https://api.github.com/users/${usuarioGitHub}`)
  const githubData = await res.json()

  if (!githubData) {
    return {
      notFound: true,
    }
  }
  const rep = await fetch(`https://api.github.com/users/${usuarioGitHub}/repos`)
  const dataRepos = await rep.json()

  let langProj = []
  dataRepos.map((projeto) => {
    langProj.push(projeto.language)
  })
  const linguagens = [...new Set(langProj.sort())]
  return {
    props: {
      usuario: githubData,
      repositorios: dataRepos,
      linguagens:linguagens
    }, // will be passed to the page component as props
  }
}

export default Home