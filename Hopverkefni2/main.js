import './style.css';
import { empty } from './scripts/helpers';

const header = document.querySelector('.layout__header');
const main = document.querySelector('.layout__main');


// This commented line below is used to push the initial route
/* window.history.pushState({}, '', `/?query=${value}`);  */

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir viðeigandi
 * gögn. Ef `id` er gefið er bók birt, ef `query` er gefið er leitarniðurstaða
 * birt, annars er forsíða birt.
 */
/*
 function route() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const query = params.get('query');

}
*/
/**
 * Bregst við því þegar við notum vafra til að fara til baka eða áfram.
 */
window.onpopstate = () => {
  empty(main);
  route();
};

// Athugum í byrjun hvað eigi að birta.
route();
