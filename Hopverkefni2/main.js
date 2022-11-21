import './style.css';
import { empty } from './scripts/helperfunctions';

window.onpopstate = () => {
  empty(main);
  route();
};

// Athugum í byrjun hvað eigi að birta.
route();
