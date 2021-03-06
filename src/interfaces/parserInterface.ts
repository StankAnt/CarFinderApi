export interface Imark {
  id?: number;
  model?: string;
  name?: string;
  url?: string;
}

export interface Imodel {
  id: number;
  model: string;
}

export interface IParser {
  models: Imodel[];
  marks: Imark[];
  ads: any[];
}

export interface ITransformedAd {
  bodyTypeId: string;
  description?: string;
  images?: IOnlinerImages;
  markId: string;
  milesFrom?: number;
  modelId: string;
  price?: string;
  sourceName: string;
  sourceUrl: string;
  year: number;
  modelName?: string;
}

export interface IOnlinerImages {
  original?: string;
  source?: string;
}

export interface ITransformedMarks {
  onlinerMarkId?: number;
  name?: string;
}

export interface IOnlinerMark {
  id?: number;
  name?: string;
}

export interface IAvMark {
  url?: string;
  name: string;
}
