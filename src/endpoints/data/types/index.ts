export type getPagesRequestType = {
  pagesCount: number;
  countryCode: 'en_US' | 'pl' | 'fr';
  seed: number;
  errors: number;
};

export type PersonType = {
  order: number;
  id: string;
  fullName: string;
  address: string;
  phone: string;
};

export type getPagesResponseType = PersonType[];

export type getPageRequestType = {
  pageOrder: number;
  countryCode: 'en_US' | 'pl' | 'fr';
  seed: number;
  errors: number;
};
export type getPageResponseType = PersonType[];
