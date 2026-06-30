import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Newsletter API here
  };

  return (
    <footer className="bg-[#F6F9FC] px-6 pt-8 text-gray-500/80 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        {/* Logo */}
        <div className="max-w-80">
          <img
            src={assets.logo}
            alt="Roomora Logo"
            className="mb-4 h-9 invert opacity-80"
          />

          <p className="text-sm">
            Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.
          </p>

          <div className="mt-4 flex gap-3">
            {[assets.instagramIcon, assets.facebookIcon, assets.twitterIcon, assets.linkendinIcon].map(
              (icon, index) => (
                <img
                  key={index}
                  src={icon}
                  alt="Social"
                  className="w-6 cursor-pointer transition hover:scale-110"
                />
              )
            )}
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-playfair text-lg text-gray-800">
            COMPANY
          </h3>

          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/press">Press</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/partners">Partners</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-playfair text-lg text-gray-800">
            SUPPORT
          </h3>

          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/safety">Safety Information</Link></li>
            <li><Link to="/cancellation">Cancellation</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-80">
          <h3 className="font-playfair text-lg text-gray-800">
            STAY UPDATED
          </h3>

          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and offers.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-4 flex"
          >
            <input
              type="email"
              autoComplete="email"
              aria-label="Email"
              placeholder="Your email"
              className="h-9 rounded-l border border-gray-300 bg-white px-3 outline-none"
              required
            />

            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-r bg-black"
            >
              <img
                src={assets.arrowIcon}
                alt="Submit"
                className="w-3.5 invert"
              />
            </button>
          </form>
        </div>
      </div>

      <hr className="mt-8 border-gray-300" />

      <div className="flex flex-col items-center justify-between gap-2 py-5 md:flex-row">
        <p>© {new Date().getFullYear()} Roomora. All rights reserved.</p>

        <ul className="flex gap-4">
          <li><Link to="/privacy">Privacy</Link></li>
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/sitemap">Sitemap</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;