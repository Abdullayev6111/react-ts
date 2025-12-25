import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaInstagram, FaTelegramPlane, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <section className="container footer-section">
        <div className="footer-left">
          <div className="links-info">
            <NavLink to="https://qalampir.uz/uz/about" target="_blank">
              About
            </NavLink>
            <NavLink to="/business">Business</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/archive">Archive</NavLink>
          </div>
          <div className="footer-left-text">
            <p>
              <span>Logo.uz</span> The Web-Site was registered as a media outlet on October 26,
              2018, with the Agency for Information and Mass Communications under the Administration
              of the President of the Republic of Uzbekistan under number 1089.
            </p>
            <p>
              Founder: <span>“Logo.uz”</span> LLC.
            </p>
            <p>
              Editorial address: 100174, Tashkent city, Beruniy street, 88-house.
              <br />
              Email address: info@logo.uz
            </p>

            <h6>© Copyright 2025 Logo.uz - The truth is bitter.</h6>
          </div>
        </div>
        <div className="footer-right">
          <div className="social-icons">
            <FaFacebookF color="#1877F2" />
            <FaYoutube color="#FF0000" />
            <FaInstagram color="#E4405F" />
            <FaTelegramPlane color="#0088cc" />
            <FaTwitter color="#0088cc" />
          </div>
          <div className="download-app">
            <div className="download-app-card">
              <NavLink to="https://apps.apple.com/tr/app/qalampir/id1560975775">
                <i className="fa-brands fa-apple"></i> AppStore
              </NavLink>
            </div>
            <div className="download-app-card">
              <NavLink to="https://play.google.com/store/apps/details?id=com.qalpampir.qalampir.uz">
                <i className="fa-brands fa-google-play"></i>
                GooglePlay
              </NavLink>
            </div>
            <div className="download-app-card">
              <NavLink to="https://appgallery.huawei.com/app/C106518715">
                <i className="fa-solid fa-briefcase"></i>
                AppGallery
              </NavLink>
            </div>
          </div>
          <div
            style={{
              width: '40px',
              height: '27px',
              borderRadius: '10px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '17px',
            }}
          >
            16+
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
