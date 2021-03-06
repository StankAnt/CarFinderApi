import { assert, expect } from 'chai';
import { Ad, BodyType, IAdModel, Mark, Model, TempAd } from '../src/db/';
import { updateDBData } from '../src/services';
import * as AdService from '../src/services//adService';
import { addTempAds, dropCollection, updateAds } from '../src/services/tempAdService';
import * as parserUtils from '../src/utils/parserUtils';

describe('Ad update', () => {
  const adFields = {
    BODY_NAME: 'superpcutecoupe',
    KMS: 20000,
    MARK_ID: '4',
    MODEL_ID: '56',
    PRICE: 1000,
    SOURCE_NAME: 'onlinerTest',
    SOURCE_URL: 'url',
    YEAR: 2010
  };

  const bodyObj = {
    name: adFields.BODY_NAME
  };

  let bodyTypeId;
  let ads: any;
  let newAds: any;

  before(async () => {
    const body = await BodyType.create(bodyObj);
    bodyTypeId = body._id;

    ads = [
      {
        bodyTypeId,
        creationDate: new Date().getDate(),
        description: 'descrip',
        images: ['url'],
        kms: adFields.KMS,
        lastTimeUpDate: new Date().getDate(),
        markId: adFields.MARK_ID,
        modelId: adFields.MODEL_ID,
        price: adFields.PRICE,
        sourceName: adFields.SOURCE_NAME,
        sourceUrl: adFields.SOURCE_URL + 0,
        year: adFields.YEAR
      },
      {
        bodyTypeId,
        creationDate: new Date().getDate(),
        description: 'descrip',
        images: ['url'],
        kms: adFields.KMS,
        lastTimeUpDate: new Date().getDate(),
        markId: adFields.MARK_ID,
        modelId: adFields.MODEL_ID,
        price: adFields.PRICE,
        sourceName: adFields.SOURCE_NAME,
        sourceUrl: adFields.SOURCE_URL + 1,
        year: adFields.YEAR
      },
      {
        bodyTypeId,
        creationDate: new Date().getDate(),
        description: 'descrip',
        images: ['url'],
        kms: adFields.KMS,
        lastTimeUpDate: new Date().getDate(),
        markId: adFields.MARK_ID,
        modelId: adFields.MODEL_ID,
        price: adFields.PRICE,
        sourceName: adFields.SOURCE_NAME,
        sourceUrl: adFields.SOURCE_URL + 2,
        year: adFields.YEAR
      }
    ];

    newAds = [
      {
        bodyTypeId,
        creationDate: new Date().getDate(),
        description: 'yaaaaahhooo',
        images: ['url'],
        kms: adFields.KMS,
        lastTimeUpDate: new Date().getDate(),
        markId: adFields.MARK_ID,
        modelId: adFields.MODEL_ID,
        price: adFields.PRICE,
        sourceName: adFields.SOURCE_NAME,
        sourceUrl: adFields.SOURCE_URL + 1,
        year: adFields.YEAR
      },
      {
        bodyTypeId,
        creationDate: new Date().getDate(),
        description: 'yaaaaahhooo',
        images: ['url'],
        kms: adFields.KMS,
        lastTimeUpDate: new Date().getDate(),
        markId: adFields.MARK_ID,
        modelId: adFields.MODEL_ID,
        price: adFields.PRICE,
        sourceName: adFields.SOURCE_NAME,
        sourceUrl: adFields.SOURCE_URL + 2,
        year: adFields.YEAR
      }
    ];

    await BodyType.remove({});
  });

  describe('should set flag false to selt car', () => {
    before(async () => {
      await addTempAds(ads);
      await updateAds();
    });

    it('should insert temp ads', async () => {
      await addTempAds(newAds);
      await AdService.markSeltAds();
      const tmpAd: IAdModel = await Ad.findOne({ sourceUrl: adFields.SOURCE_URL + 0 });
      assert.equal(tmpAd.isSold, true);
    });

    after(async () => {
      await TempAd.remove({});
      await Ad.remove({});
    });
  });

  describe('temp ads', () => {
    before(async () => {
      await addTempAds(ads);
    });

    it('should insert temp ads', async () => {
      const tmpAds = await TempAd.find({});
      assert.equal(tmpAds.length, ads.length);
    });

    after(async () => {
      await TempAd.remove({});
    });
  });

  describe('ads updating', () => {
    before(async () => {
      await addTempAds(newAds);
      await updateAds();
    });

    it('should insert ads if ads collection empty', async () => {
      await addTempAds(ads);
      await updateAds();
      const Ads = await Ad.find({});
      assert.equal(Ads.length, ads.length);
    });

    after(async () => {
      await Ad.remove({});
    });
  });
});
