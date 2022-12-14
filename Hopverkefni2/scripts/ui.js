import {
  empty, el, byName, byDate,
} from './helpers';

const sortbuttons = document.querySelector('.sortbuttons');
const wrapper = document.querySelector('.wrapper');

async function getData() {
  let filearray;
  try {
    filearray = await fetch('./data/events.json');
  } catch (error) {
    console.error('error');
  }
  return filearray.json();
}

async function getImage() {
  const nyMynd = await fetch('https://picsum.photos/300/200');
  const source = nyMynd.url;
  return source;
}

async function DisplayAllEvents(data) {
  empty(wrapper);
  for (let i = 0; i < data.length; i += 1) {
    const source = await getImage();
    const aDiv = el('div', {});
    const pDiv = el('div', {});
    const storaDiv = el('div', { class: 'storaDiv' });
    aDiv.append(el('a', { href: `/?id=${data[i].id}`, class: 'linkhref' }, el('img', { src: source, class: 'imgresponsive' })));
    pDiv.append(el('p', {}, data[i].language.is.title));
    pDiv.append(el('p', {}, data[i].language.is.place));
    pDiv.append(el('p', {}, `${(data[i].start).slice(11, 16)}-${(data[i].end).slice(11, 16)}`));
    storaDiv.append(aDiv, pDiv);
    wrapper.append(storaDiv);
  }
}

async function DisplayOneEvent(data, main, id) {
  for (let i = 0; i < data.length; i += 1) {
    const source = await getImage();
    if (data[i].id === Number(id)) {
      main.append(el('a', { }, el('img', { src: source, class: 'clickedimg' })));
      main.append(el('p', {}, data[i].language.is.title));
      main.append(el('p', {}, data[i].language.is.text));
      main.append(el('p', {}, `${'Dagsetning:  '}${(data[i].start.slice(0, 10))}`));
      main.append(el('p', {}, `${'Tími:  '}${(data[i].start).slice(11, 16)}-${(data[i].end).slice(11, 16)}`));
      main.append(el('p', {}, `${'Stadsetning:  '}${(data[i].language.is.place)}`));
      main.append(el('p', {}, `${'Heimilisfang:  '}${(data[i].formatted_address)}`));
      const addmap = main.append(el('div', { id: 'map' }));
      // addmap;
      const map = L.map('map').setView([data[i].location[0], data[i].location[1]], 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      L.marker([data[i].location[0], data[i].location[1]]).addTo(map);
    }
  }
}
/**
 * Sækir gögn um event og birtir þau.
 * @param {element} main Element sem á að birta events í.
 * @param {element} button Leitarform sem á að gera óvirkt meðan event er sótt.
 * @param {string} id Auðkenni á event.
 */
async function fetchAndRenderEvents(id, main) {
  //empty(main);
  const data = await getData();
  await DisplayOneEvent(data, main, id);
}

function addSortbuttons(div) {
  div.append(el('button', { class: 'sortbutton', id: 'sortbyname' }, 'Raða eftir nafni'));
  div.append(el('button', { class: 'sortbutton', id: 'sortbydate' }, 'Raða eftir tíma'));
}

function sortfunctionalities(main) {
  const sortbyname = document.querySelector('#sortbyname');
  const sortbydate = document.querySelector('#sortbydate');
  sortbyname.addEventListener('click', async () => {
    const data = await getData();
    DisplayAllEvents(data.sort(byName), main);
  });
  sortbydate.addEventListener('click', async () => {
    const data = await getData();
    DisplayAllEvents(data.sort(byDate), main);
  });
}

async function renderFrontpage(main) {
  const dataOne = await getData();
  DisplayAllEvents(dataOne, main);
  addSortbuttons(sortbuttons);
  sortfunctionalities(main);
}

export {
  fetchAndRenderEvents, renderFrontpage,
};
