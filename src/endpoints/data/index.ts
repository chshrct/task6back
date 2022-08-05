import fs from 'fs';

import { Request, Response } from 'express';
import Papa from 'papaparse';

import { getPage, getPages } from '../../utils/getPages';

import {
  getPageRequestType,
  getPageResponseType,
  getPagesRequestType,
  getPagesResponseType,
  PersonType,
} from './types';

export default {
  getPages: (
    req: Request<any, any, any, getPagesRequestType>,
    res: Response<getPagesResponseType>,
  ) => {
    const { pagesCount, countryCode, seed, errors } = req.query;
    const pagesData = getPages(Number(pagesCount), Number(seed), countryCode, errors);

    res.send(pagesData);
  },
  getPage: (
    req: Request<any, any, any, getPageRequestType>,
    res: Response<getPageResponseType>,
  ) => {
    const { countryCode, pageOrder, seed, errors } = req.query;

    const page: PersonType[] = [];

    getPage(Number(pageOrder), Number(seed), countryCode, page, errors);

    res.send(page);
  },
  getCSV: (
    req: Request<any, any, any, getPagesRequestType>,
    res: Response<getPagesResponseType>,
  ) => {
    const { pagesCount, countryCode, seed, errors } = req.query;
    const pagesData = getPages(Number(pagesCount), Number(seed), countryCode, errors);
    const pagesDataCSV = Papa.unparse(pagesData);

    // eslint-disable-next-line no-path-concat
    fs.writeFileSync(`./src/endpoints/data/data.csv`, pagesDataCSV);
    res.sendFile('data.csv', { root: __dirname });
  },
};
