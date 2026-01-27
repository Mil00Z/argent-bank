import {Link} from 'react-router'
import '@styles/layout/_footer.scss'

const Footer = () => {


  return(

      <footer className="footer">
        <p className="footer-text">Copyright 2025 Argent Bank by <Link to="https://github.com/Mil00Z/argent-bank" target="_blank">Mil00z</Link> </p>
    </footer>
    )

}
export default Footer