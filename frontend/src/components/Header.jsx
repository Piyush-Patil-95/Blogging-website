import { Link } from "react-router-dom";
import "../css/Header.css";
import { useUser } from "../context/UserContext";


export default function Header() {
  const {user, logout} = useUser();
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          {/* Place logo.png in public/ so it's available at /logo.png */}
          <Link to="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>

        <nav className="nav ">
          <ul className="nav-links">
            <li><Link to="/" className="link">HOME</Link></li>
            <li><Link to="/myblogs" className="link">MY BLOGS</Link></li>
            {/* <li><Link to="/pins" className="link">PINS</Link></li> */}
            
            {user? (
              <>
                <li><Link onClick={logout} className="link">LOGOUT</Link></li>
                
                
              </>
            ):(
              <li><Link to="/login" className="link">LOGIN</Link></li>
            )
          }
          </ul>
        </nav>
        <div className="logo-spacer">
          <div className="mt-3"></div>
          {user && <span className="ml-3 text-end link">{user.name}</span>}
        </div>
      </div>
    </header>
    
  );
}
