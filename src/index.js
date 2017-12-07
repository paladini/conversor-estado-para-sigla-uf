import Fuse from 'fuse.js';

// Dicionáriio UF -> NomeExato
export const Estado = require('./sigla-estado.json');

// Dicionário NomeExato -> UF
export const UF = Object
  .entries(Estado)
  .reduce((acc, [k, v]) =>
    (acc[v] = k, acc)  // switch key and value
  , {});

// Lista das siglas
const UFS = Object.keys(Estado);

// Lista dos nomes
const NOMES = Object.values(Estado);


// Mesma funcionalidade da função original no HTML
export const converterEstado = (() => {
  const normalize = str =>
    removeAccents(str)
      .toUpperCase();

  const removeAccents = str =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const haystack = NOMES.map(n => [normalize(n), UF[n]]);

  return needle =>
    haystack
      .find(el => normalize(needle) === el[0])[1];
})();


// Faz uma fuzzy search pelo nome do estado
export const closest = (() => {
  const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
  };

  const fuse = new Fuse(NOMES, options);

  return needle => fuse
      .search(needle)
      .map(i => UF[NOMES[i]])[0];
})();
