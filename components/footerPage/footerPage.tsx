import React from "react"
import styles from "../../styles/footer.module.css"
export default function FooterPage(){
    return(
        <footer className={styles.footer}>
        <a
          href="https://github.com/MadsonAlan"
          target="_blank"
          rel="Github do Madson"
        >
        Desenvolvido por Madson Alan
        </a>
      </footer>
    )
}