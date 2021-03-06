import * as mongoose from 'mongoose';

import { IMark } from '../../interfaces';

export interface IMarkModel extends IMark, mongoose.Document {}

const MarkSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true
    }
  },
  { versionKey: false }
);

export { MarkSchema };
