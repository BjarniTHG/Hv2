import { empty, el } from './helpers';
import { getData, getdataforonevent } from '../main';

/**
 * Útbýr leitarform og skilar elementi.
 * @param {function} searchHandler Event handler fyrir leit.
 * @returns Element fyrir leitarform.
 */
export function createSearchInput(searchHandler) {
  const search = el('input', { type: 'search', placeholder: 'Leita' });
  const button = el('button', {}, 'Leita');

  const container = el('form', { class: 'search' }, search, button);
  container.addEventListener('submit', searchHandler);
  return container;
}

export async function DisplayAllEvents(data, main) {
  for (let i = 0; i < data.length; i++) {
    const nyMynd = await fetch('https://picsum.photos/300/200');
    const source = nyMynd.url;
    main.append(el('a', { href: `/?id=${data[i].id}`, class: 'linkhref' }, el('img', { src: source, class: 'imgresponsive' })));
    main.append(el('p', {}, data[i].language.is.title));
    main.append(el('p', {}, data[i].language.is.place));
    main.append(el('p', {}, `${(data[i].start).slice(11, 16)}-${(data[i].end).slice(11, 16)}`));
  }
}

async function DisplayOneEvent(data, main, id) {
  // console.log(id);
  // console.log(data);
  // console.log(data.length);
  // console.log(data[0].id);
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      const nyMynd = await fetch('https://picsum.photos/300/200');
      const source = nyMynd.url;
      main.append(el('a', { }, el('img', { src: source, class: 'clickedimg' })));
      main.append(el('p', {}, data[i].language.is.title));
      main.append(el('p', {}, `${(data[i].start).slice(11, 16)}-${(data[i].end).slice(11, 16)}`));
    }
  }
}
/**
 * Sækir gögn um event og birtir þau.
 * @param {element} main Element sem á að birta events í.
 * @param {element} button Leitarform sem á að gera óvirkt meðan event er sótt.
 * @param {string} id Auðkenni á event.
 */
export async function fetchAndRenderEvents(id, main) {
  // console.log("hello from fetchAndRenderEvents");
  empty(main);
  const data = await getdataforonevent();
  DisplayOneEvent(data, main, id);
}

export async function renderFrontpage(main) {
  main.append(await getData());
}
