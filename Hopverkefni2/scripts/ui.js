import { empty, el } from './helpers';

/**
 * Setur „loading state“ skilabað meðan gögn eru sótt.
 * @param {element} main Element sem á að birta skilbaoð í.
 * @param {element} searchForm Leitarform sem á að gera óvirkt.
 */
function setLoading(main, searchForm) {
  searchForm.setAttribute('disabled', true);
  empty(main);
  main.appendChild(el('p', {}, 'Sæki gögn...'));
}

/**
 * Fjarlægir „loading state“.
 * @param {element} main Element sem á að tæma.
 * @param {element} searchForm Leitarform sem á að gera virkt.
 */
function setNotLoading(main, searchForm) {
  searchForm.removeAttribute('disabled');
  empty(main);
}

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
export async function fetchAndRenderEvents(main, searchForm, id) {
  setLoading(main, searchForm);
  const events = await getEvents(id);
  setNotLoading(main, searchForm);

  if (!events) {
    main.appendChild(el('p', {}, ' Engir viðburðir fundust'));
    return;
  }

  main.appendChild(createEvents(events));
}

/**
 * Sækir leitarniðurstöður og birtir þær.
 * @param {element} main Element sem á að birta leitarniðurstöður í.
 * @param {element} button Leitarform sem á að gera óvirkt meðan gögn eru sótt.
 * @param {string} query Leitarstrengur.
 */
export async function searchAndRender(main, searchForm, query) {
  const button = searchForm.querySelector('button');

  setLoading(main, button);
  const results = await searchEvents(query);
  setNotLoading(main, button);

  const resultsEl = createSearchResults(results, query);

  main.appendChild(resultsEl);
}

/**
 * Birtir upplýsingar á forsíðu.
 * @param {element} main Element sem á að birta upplýsingar í.
 */
export function renderFrontpage(main) {
  main.appendChild(el('p', {}, 'This is the frontpage.'));
}