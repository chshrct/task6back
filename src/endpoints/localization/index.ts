import { Request, Response } from 'express';

import { LocalizationModel } from '../../models/db/localization.db';

import { LocalizaitonResponseType } from './types';

export default {
  getLocalizations: async (req: Request, res: Response<LocalizaitonResponseType>) => {
    const localizations = await LocalizationModel.find({});
    const mappedLocalizations = localizations.map(localization => ({
      id: localization._id,
      country: localization.country,
      countryCode: localization.countryCode,
    }));

    res.send(mappedLocalizations);
  },
};
