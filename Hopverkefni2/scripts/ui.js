import { empty, el } from './helpers';


async function getData() {
  let filearray;
  try {
    filearray = await fetch('./data/events.json');
  } catch (error) {
    console.warn('error');
  }
  return filearray.json();
}

async function getImage() {
  const nyMynd = await fetch('https://picsum.photos/300/200');
  const source = nyMynd.url;
  return source;
}

async function DisplayAllEvents(data, main) {
  for (let i = 0; i < data.length; i++) {
    const source = await getImage();
    main.append(el('a', { href: `/?id=${data[i].id}`, class: 'linkhref' }, el('img', { src: source, class: 'imgresponsive' })));
    main.append(el('p', {}, data[i].language.is.title));
    main.append(el('p', {}, data[i].language.is.place));
    main.append(el('p', {}, `${(data[i].start).slice(11, 16)}-${(data[i].end).slice(11, 16)}`));
  }
}

async function DisplayOneEvent(data, main, id) {
  console.log(data[0].location[0]);
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      const source =await getImage();
      main.append(el('a', { }, el('img', { src: source, class: 'clickedimg' })));
      main.append(el('p', {}, data[i].language.is.title));
      main.append(el('p', {}, data[i].language.is.text));
      main.append(el('p', {}, `${'Date:  '}${(data[i].start.slice(0, 10))}`));
      main.append(el('p', {}, `${'Time:  '}${(data[i].start).slice(11, 16)}-${(data[i].end).slice(11, 16)}`));
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
  // console.log("hello from fetchAndRenderEvents");
  empty(main);
  const data = await getData();
  DisplayOneEvent(data, main, id);
}

async function renderFrontpage(main) {
  const dataOne = await getData();
  DisplayAllEvents(dataOne, main);
}

export {
  fetchAndRenderEvents, renderFrontpage, DisplayAllEvents,
};

