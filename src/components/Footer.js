import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <h5>Copyright &copy; 2022</h5>
            <Link className='details' to='/about'>About</Link>
        </footer>
    )
}
export default Footer