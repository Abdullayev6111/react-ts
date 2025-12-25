import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container header-content">
        <NavLink to="/" className="logo">
          Logo.uz
        </NavLink>
        <div className="header-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/services">Services</NavLink>
        </div>
        <button className="login-btn">Sign in / Login</button>
      </div>
    </header>
  );
};

export default Header;
