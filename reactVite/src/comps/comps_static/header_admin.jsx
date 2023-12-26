import { Link } from 'react-router-dom'

export const HeaderAdmin = () => {
    return (
        <header className='container-fluid client-header bg-light shadow'>
            <div className="container ">
                <div className="row align-items-center">
                    <div className="logo col-auto">
                        <h2><Link to="/">Yoga</Link></h2>
                    </div>
                    <nav className='d-flex col justify-content-between align-items-center'>

                        <ul className='nav'>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>

                            <li>
                                <Link to="/teachers">Our teachers</Link>
                            </li>
                        </ul>
                        <div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>

    )
}