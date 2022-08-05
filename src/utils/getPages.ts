import { faker } from '@faker-js/faker';
import { create } from 'random-seed';

import { PersonType } from '../endpoints/data/types';

import { addErrors } from './getError';

const PAGE_SIZE = 10;
const ID_RANGE = 9999999999;
const STRING_RADIX = 36;
const BINARY_RANGE = 2;

export const getPages = (
  pagesCount: number,
  seed: number,
  countryCode: 'en_US' | 'pl' | 'fr',
  errors: number,
): PersonType[] => {
  const pagesData: PersonType[] = [];

  for (let pageOrder = 1; pageOrder <= pagesCount; pageOrder += 1) {
    getPage(pageOrder, seed, countryCode, pagesData, errors);
  }

  return pagesData;
};

export const getPage = (
  pageOrder: number,
  seed: number,
  countryCode: 'en_US' | 'pl' | 'fr',
  dataStore: PersonType[],
  errors: number,
): void => {
  for (
    let itemIndex = PAGE_SIZE * (pageOrder - 1) + 1;
    itemIndex <= PAGE_SIZE * (pageOrder - 1 + 1);
    itemIndex += 1
  ) {
    const currentSeed = seed + itemIndex;

    dataStore.push(getPerson(itemIndex, currentSeed, countryCode, errors));
  }
};

const getPerson = (
  index: number,
  currentSeed: number,
  countryCode: 'en_US' | 'pl' | 'fr',
  errors: number,
): PersonType => {
  faker.seed(currentSeed);
  faker.setLocale(countryCode);
  const random = create(String(currentSeed));
  const person: PersonType = {
    order: index,
    id: addErrors(
      random.range(ID_RANGE).toString(STRING_RADIX),
      random,
      errors,
      countryCode,
    ),
    fullName: addErrors(faker.name.findName(), random, errors, countryCode),
    address: addErrors(
      `${
        random.range(BINARY_RANGE)
          ? faker.address.streetAddress()
          : faker.address.streetName()
      }, ${faker.address.secondaryAddress()}, ${faker.address.cityName()}${
        random.range(BINARY_RANGE) ? ', ' + faker.address.state() : ''
      } ${random.range(BINARY_RANGE) ? ', ' + faker.address.zipCode() : ''}`,
      random,
      errors,
      countryCode,
    ),
    phone: addErrors(faker.phone.number(), random, errors, countryCode),
  };

  return person;
};
