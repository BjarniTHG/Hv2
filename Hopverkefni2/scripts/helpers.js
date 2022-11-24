/* eslint-disable no-restricted-syntax */
/**
 * Býr til element með nafni og bætir við öðrum elementum eða texta nóðum.
 * @param {string} name Nafn á elementi
 * @param  {...string | HTMLElement} children Hugsanleg börn: önnur element eða strengir
 * @returns {HTMLElement} Elementi með gefnum börnum
 */
export function el(name, attributes = {}, ...children) {
  const e = document.createElement(name);

  for (const key of Object.keys(attributes)) {
    e.setAttribute(key, attributes[key]);
  }

  for (const child of children) {
    if (typeof child === 'string' || typeof child === 'number') {
      e.appendChild(document.createTextNode(child.toString()));
    } else {
      e.appendChild(child);
    }
  }

  return e;
}

/**
 * Fjarlægir öll börn `element`.
 * @param {HTMLElement} element Element sem á að tæma
 */
export function empty(element) {
  if (!element || !element.firstChild) {
    return;
  }

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function byName(a, b) {
  // alphabetically by name
  if (a.name > b.name) {
    return 1;
  } if (b.name > a.name) {
    return -1;
  }
  return 0;
}

export function byId(a, b) {
  // numerically by id
  return parseInt(a.id) - parseInt(b.id);
}

export function byDate(a, b) {
  // chronologically by year, month, then day
  return new Date(a.dob).valueOf() - new Date(b.dob).valueOf(); // timestamps
}

export function byBirthday(a, b) {
  // by month and then by day
  const d1 = new Date(a.dob); // 1993-02-15T00:00:00Z =>   1993-02-14T20:00:00EST
  const d2 = new Date(b.dob);
  log(d1.getDate(), d1.getUTCDate(), d1.getMonth(), d1.getUTCMonth());
  if (d1.getUTCMonth() > d2.getUTCMonth()) {
    return 1;
  } if (d1.getUTCMonth() < d2.getUTCMonth()) {
    return -1;
  }
  // same month
  return d1.getUTCDate() - d2.getUTCDate();
}
