
import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


function Navbars(props) {

  const value = useContext(UserContext)
  const logout = () => {
    localStorage.removeItem('token')
    value.isAuth = false
    value.userName = ""
    value.userRole = ""
    console.log(value.userName);

    value.callAuth();
  }

  return (
    <>

      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Employees App</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">

            <li className="navbar-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            {value.userRole === "admin" ?
              <li className="navbar-item">
                <Link to="/Add" className="nav-link">Add Employee</Link>
              </li> : null}
            <li className="navbar-item">
              <Link to="/contact" className="nav-link">Contact Us</Link>
            </li>

          </ul>
        </div>
        <Navbar.Text>
          <span title="userName">{value.userName}</span>
          <NavLink title="logout" to="#" onClick={logout}>Logout</NavLink>
        </Navbar.Text>
      </nav>




    </>
  )
}
export default Navbars;