import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function header() {

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Goal Setter</Link>
            </div>
            <ul> {/* unorder list*/}
                {/* If user is not logged in then see log in or register, if logged in then logout is visible*/}
                <li>
                    <Link to='/login'>
                        <FaSignInAlt>
                            Login
                        </FaSignInAlt>
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser>
                            Register
                        </FaUser>
                    </Link>
                </li>
                
            </ul>
        </header>
    )
}

export default header