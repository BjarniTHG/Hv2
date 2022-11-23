import { empty, el } from './helpers';
import { getData ,savedata} from '../main';


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


/**
 * Sækir gögn um event og birtir þau.
 * @param {element} main Element sem á að birta events í.
 * @param {element} button Leitarform sem á að gera óvirkt meðan event er sótt.
 * @param {string} id Auðkenni á event.
 */
export async function fetchAndRenderEvents(id) {
  getData();
}

export async function renderFrontpage(main) {
  main.append(await getData());
}
