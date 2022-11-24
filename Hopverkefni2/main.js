import './style.css';
import './data/events.json';
import { empty } from './scripts/helpers';
import { fetchAndRenderEvents, renderFrontpage } from './scripts/ui';

const main = document.querySelector('.layout__main');

/*
data[i].language.is.title
data[i].language.is.place
data[i].language.is.text */

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir viðeigandi
 * gögn. Ef `id` er gefið er bók birt, ef `query` er gefið er leitarniðurstaða
 * birt, annars er forsíða birt.
 */

async function route() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    fetchAndRenderEvents(id, main);

    // console.log("your EVENT route is working");
  } else {
    renderFrontpage(main);
    // console.log('your MAIN route is working');
  }
}

/**
 * Bregst við því þegar við notum vafra til að fara til baka eða áfram.
 */
window.onpopstate = () => {
  empty(main);
  route();
};
// Athugum í byrjun hvað eigi að birta.
route();
