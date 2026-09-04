import { Link } from 'react-router-dom';
import Seal from '../components/Seal.jsx';
import HeroRays from '../components/HeroRays.jsx';

export default function NotFound() {
  return (
    <div className="site">
      <header className="hero">
        <HeroRays />
        <div className="hero-inner pricing-hero-inner">
          <div className="hero-mark">
            <Seal size={72} stroke="#D8B476" weight="light" />
            <div className="hero-kicker">LUMIÈRE PHOTOBOOTH — ABUJA</div>
          </div>
          <h1 className="pricing-h1">
            That page has
            <br />
            stepped out of frame.
          </h1>
          <p className="hero-lede">
            The link you followed does not lead anywhere on this site. The booth, the packages
            and the enquiry form are all a step away.
          </p>
          <div className="hero-actions">
            <Link to="/" className="lum-btn lum-btn-gold">Back to the booth</Link>
            <Link to="/pricing" className="lum-btn lum-btn-outline-gold">See the pricing</Link>
          </div>
        </div>
      </header>
    </div>
  );
}
