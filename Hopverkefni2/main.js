import './style.css';
import './data/events.json';
import { empty, el } from './scripts/helpers';
import {
  createSearchInput,
  fetchAndRenderEvents,
  renderFrontpage,
  searchAndRender,
} from './scripts/ui';

const header = document.querySelector('.layout__header');
const main = document.querySelector('.layout__main');

async function getData() {
  try {
    await fetch('./data/events.json')
    .then((response) => response.json())
    .then((json) => savedata(json));
  } catch (error) {
    console.log("error");
  }
}
getData();
/*
data[i].language.is.title
data[i].language.is.place
data[i].language.is.text */
async function savedata(jsonfromfile) {
  const data = jsonfromfile;
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let img = document.createElement("img");
    let nyMynd = await fetch('https://picsum.photos/300/200');
    img.src = nyMynd.url;
    main.append(img);
    main.append(el('p', {}, data[i].language.is.title));
    main.append(el('p', {}, data[i].language.is.place));
    main.append(el('p', {}, (data[i].start).slice(11,16) +'-'+(data[i].end).slice(11,16)));
  }
  
}


// This commented line below is used to push the initial route
/* window.history.pushState({}, '', `/?query=${value}`);  */

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir viðeigandi
 * gögn. Ef `id` er gefið er bók birt, ef `query` er gefið er leitarniðurstaða
 * birt, annars er forsíða birt.
 */

function route() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const query = params.get('query');
  if (id) {
    fetchAndRenderEvents(main, searchForm, id);
  } else if (query) {
    searchAndRender(main, searchForm, query);
  } else {
    renderFrontpage(main);
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
/*route();*/
