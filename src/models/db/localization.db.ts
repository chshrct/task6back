import { model, Model, Schema } from 'mongoose';

export interface ILocalization {
  _id: string;
  collectionsPrefix: string;
  country: string;
}

const ILocalizationSchema = new Schema<ILocalization>(
  {
    _id: { type: String, required: true },
    collectionsPrefix: { type: String, required: true, unique: true },
    country: { type: String, required: true, unique: true },
  },
  { collection: 'localizations', timestamps: true },
);

export const LocalizationModel: Model<ILocalization> = model(
  'localization',
  ILocalizationSchema,
);
