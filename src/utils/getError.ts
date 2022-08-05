import { RandomSeed } from 'random-seed';

const RANGE = 4;
const FUNC_RANDOM_RANGE = 3;

const errorsChance = {
  '25': [0, 0, 0, 1],
  '5': [0, 0, 1, 1],
  '75': [0, 1, 1, 1],
};

const characters = {
  en_US: [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ],
  pl: [
    'a',
    'ą',
    'b',
    'c',
    'ć',
    'd',
    'e',
    'ę',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'ł',
    'm',
    'n',
    'ń',
    'o',
    'ó',
    'p',
    'q',
    'r',
    's',
    'ś',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'ź',
    'ż',
    'A',
    'Ą',
    'B',
    'C',
    'Ć',
    'D',
    'E',
    'Ę',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'Ł',
    'M',
    'N',
    'Ń',
    'O',
    'Ó',
    'P',
    'Q',
    'R',
    'S',
    'Ś',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'Ź',
    'Ż',
  ],
  fr: [
    'a',
    'à',
    'â',
    'b',
    'c',
    'ç',
    'd',
    'e',
    'è',
    'é',
    'ê',
    'ë',
    'f',
    'g',
    'h',
    'i',
    'î',
    'ï',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'ô',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'ù',
    'û',
    'ü',
    'v',
    'w',
    'x',
    'y',
    'ÿ',
    'z',
    'æ',
    'œ',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ],
  num: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
};

const getDecimalPart = (num: number): number => {
  if (Number.isInteger(num)) {
    return 0;
  }

  const decimalStr = num.toString().split('.')[1];

  return Number(decimalStr);
};

const getErrorsCount = (errors: number, random: RandomSeed): number => {
  const decimal = getDecimalPart(errors);
  // @ts-ignore
  const error = decimal ? errorsChance[String(decimal)][random.range(RANGE)] : 0;

  return Math.floor(errors) + error;
};

const deleteRandomChar = (str: string, random: RandomSeed): string => {
  const indexToDelete = random.range(str.length);

  return indexToDelete < str.length - 1
    ? `${str.slice(0, indexToDelete)}${str.slice(indexToDelete + 1)}`
    : `${str.slice(0, indexToDelete)}`;
};

const shuffleCloseCharacters = (str: string, random: RandomSeed): string => {
  const indexToShuffle = random.range(str.length - 1);
  const strArr = str.split('');
  const tempChar = strArr[indexToShuffle];

  strArr[indexToShuffle] = strArr[indexToShuffle + 1];
  strArr[indexToShuffle + 1] = tempChar;

  return strArr.join('');
};

const addRandomChar = (
  str: string,
  random: RandomSeed,
  countryCode: 'en_US' | 'pl' | 'fr',
): string => {
  const indexToAdd = random.range(str.length);
  const charsToPick = [...characters[countryCode], ...characters.num];
  const charToAdd = charsToPick[random.range(charsToPick.length)];

  return indexToAdd < str.length - 1
    ? `${str.slice(0, indexToAdd + 1)}${charToAdd}${str.slice(indexToAdd + 1)}`
    : `${str.slice(0, indexToAdd + 1)}${charToAdd}`;
};

const errorFuncs = [deleteRandomChar, shuffleCloseCharacters, addRandomChar];

export const addErrors = (
  str: string,
  random: RandomSeed,
  errors: number,
  countryCode: 'en_US' | 'pl' | 'fr',
): string => {
  const errorsCount = getErrorsCount(errors, random);
  let result = str;

  for (let i = 0; i < errorsCount; i += 1) {
    result = errorFuncs[random.range(FUNC_RANDOM_RANGE)](result, random, countryCode);
  }

  return result;
};
