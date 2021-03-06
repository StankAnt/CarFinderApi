import { assert } from 'chai';
import { codeErrors } from '../src/config/config';
import { Ad, BodyType, Mark, Model } from '../src/db';
import { User } from '../src/db';
import { IAd } from '../src/interfaces';
import * as adRepository from '../src/repositories/adRepository';
import * as bodyTypeRepository from '../src/repositories/bodyTypeRepository';
import * as markRepository from '../src/repositories/markRepository';
import * as modelRepository from '../src/repositories/modelRepository';
import * as userRepository from '../src/repositories/userRepository';

import {error} from "util";

describe('Repositories', () => {
  describe('Mark Repositories', () => {
    const marks = [
      {
        name: 'MarkRepoTest123'
      },
      {
        name: 'MarkRepoTest321'
      },
      {
        name: 'MarkRepoTest666'
      }
    ];
    const markEntry = {
      name: 'MarkRepoTest999'
    };
    before(async () => {
      await Mark.create(marks);
    });
    it('should save a new mark entry', async () => {
      await markRepository.update(markEntry);
      const savedMark = await markRepository.getByName(markEntry.name);
      assert.equal(savedMark.name, markEntry.name);
      assert.exists(savedMark._id);
    });
    it('should return an array of marks', async () => {
      const result = await markRepository.getAll();
      assert.lengthOf(result, 4);
    });
    it('should return an object with mark if name passed is valid', async () => {
      const result = await markRepository.getByName(marks[0].name);
      assert.equal(result.name, marks[0].name);
      assert.exists(result._id);
    });
    after(async () => {
      await Mark.remove({
        name: {
          $in: [marks[0].name, marks[1].name, marks[2].name, markEntry.name]
        }
      });
    });
  });
  describe('Model Repositories', () => {
    const models = [
      {
        markId: 'modelrepotest1',
        name: 'ModelRepoTest123'
      },
      {
        markId: 'modelrepotest2',
        name: 'ModelRepoTest321'
      },
      {
        markId: 'modelrepotest3',
        name: 'ModelRepoTest666'
      }
    ];
    const modelEntry = [
      {
        markId: 'modelrepotest4',
        name: 'ModelRepoTest999'
      },
      {
        markId: 'modelrepotest5',
        name: 'ModelRepoTest777'
      },
    ]
    before(async () => {
      await Model.create(models);
    })
    it('should save a new mark entries', async () => {
      await modelRepository.update(modelEntry);
      const savedModels = await modelRepository.getAll();
      assert.lengthOf(savedModels, 5);
    });
    it('should return an array of models', async () => {
      const result = await modelRepository.getAll();
      assert.lengthOf(result, 5);
    });
    it('should return a model, if markId and name are valid', async () => {
      const result = await modelRepository.getByNameAndMarkId(models[0].name, models[0].markId);
      assert.equal(result.name, models[0].name);
      assert.equal(result.markId, models[0].markId);
      assert.exists(result._id);
    });
    it('should return an object with model if name passed is valid', async () => {
      const result = await modelRepository.getByName(models[0].name);
      assert.equal(result.name, models[0].name);
      assert.exists(result._id);
    });
    after(async () => {
      await Model.remove({
        name: {
          $in: [models[0].name, models[1].name, models[2].name, modelEntry[0].name, modelEntry[1].name]
        }
      });
    });
  });
  describe('BodyType Repositories', () => {
    const bodyTypes = [
      {
        name: 'BodyTypeRepoTest1'
      },
      {
        name: 'BodyTypeRepoTest2'
      }
    ];
    const bodyTypeEntry = {
      name: 'BodyTypeRepoTest3'
    };
    beforeEach(async () => {
      await BodyType.create(bodyTypes);
    });
    it('shoud save a new body type entry', async () => {
      await bodyTypeRepository.save(bodyTypeEntry);
      const result = await bodyTypeRepository.getByName(bodyTypeEntry.name);
      assert.equal(result.name, bodyTypeEntry.name);
      assert.exists(result._id);
    });
    it('shoud return an array of all bodytypes', async () => {
      const result = await bodyTypeRepository.getAll();
      assert.lengthOf(result, 2);
    });
    it('should throw error if body type exist', async()=> {
      let recError:any;
      const originalException = process.listeners('uncaughtException').pop();
      process.removeListener('uncaughtException', originalException);
      process.once("uncaughtException",  (err) => {
        recError = err;
      });
      try {
        await bodyTypeRepository.save(bodyTypeEntry);
        await bodyTypeRepository.save(bodyTypeEntry);
      } catch (e) {
        assert.equal(e.code,11000);
      }
      process.listeners('uncaughtException').push(originalException);
    });
    afterEach(async () => {
      await BodyType.remove({
        name: {
          $in: [bodyTypes[0].name, bodyTypes[1].name, bodyTypeEntry.name]
        }
      });
    })
  });
  describe('Ad Repositories', () => {
    const ads: any[] = [
      {
        bodyTypeId: 'repotestbodytypeidforad1',
        creationDate: new Date().getDate(),
        lastTimeUpDate: new Date().getDate(),
        markId: 'repotestmarkididforad1',
        modelId: 'repotestmodelididforad1',
        sourceName: 'repotestsourcenameidforad1',
        sourceUrl: 'repotestsourceurlidforad1',
        year: 2017
      },
      {
        bodyTypeId: 'repotestbodytypeidforad2',
        creationDate: new Date().getDate(),
        lastTimeUpDate: new Date().getDate(),
        markId: 'repotestmarkididforad2',
        modelId: 'repotestmodelididforad2',
        sourceName: 'repotestsourcenameidforad2',
        sourceUrl: 'repotestsourceurlidforad2',
        year: 2017
      },
      {
        bodyTypeId: 'repotestbodytypeidforad3',
        creationDate: new Date().getDate(),
        lastTimeUpDate: new Date().getDate(),
        markId: 'repotestmarkididforad3',
        modelId: 'repotestmodelididforad3',
        sourceName: 'repotestsourcenameidforad3',
        sourceUrl: 'repotestsourceurlidforad3',
        year: 2017
      }
    ];
    const adEntry = {
      bodyTypeId: 'repotestbodytypeidforad4',
      creationDate: new Date().getDate(),
      lastTimeUpDate: new Date().getDate(),
      markId: 'repotestmarkididforad4',
      modelId: 'repotestmodelididforad4',
      sourceName: 'repotestsourcenameidforad4',
      sourceUrl: 'repotestsourceurlidforad4',
      year: 2017
    };
    before(async () => {
      await Ad.create(ads);
    });
    it('should save a new ad entry', async () => {
      await adRepository.save(adEntry);
      const savedAd = await adRepository.getAdByURL(adEntry.sourceUrl);
      assert.equal(savedAd.sourceUrl, savedAd.sourceUrl);
      assert.exists(savedAd._id);
    });
    it('should throw a database error, if ad entry is not valid', async () => {
      try {
        await adRepository.save(adEntry);
      } catch (error) {
        assert.equal(error.code, codeErrors.MONGO_DUPLICATE_ERROR);
      }
    });
    it('should return an array of ads', async () => {
      const result = await adRepository.getAll();
      assert.lengthOf(result, 5);
    });
    it('should return an object with model if name passed is valid', async () => {
      const result = await adRepository.getAdByURL(ads[0].sourceUrl);
      assert.equal(result.sourceUrl, ads[0].sourceUrl);
      assert.exists(result._id);
    });
    after(async () => {
      await Ad.remove({
        sourceUrl: {
          $in: [ads[0].sourceUrl, ads[1].sourceUrl, ads[2].sourceUrl, adEntry.sourceUrl]
        }
      });
    });
  });
  describe('User Repositories', () => {
    const users = [
      {
        confirmed: true,
        email: '666testtest@test.com',
        name: 'TestName',
        password: 'Password1#',
        subscription: true
      },
      {
        confirmed: true,
        email: '999testtest@test.com',
        name: 'TestName',
        password: 'Password1#',
        subscription: true
      },
      {
        confirmed: true,
        email: '888testtest@test.com',
        name: 'TestName',
        password: 'Password1#',
        subscription: false
      }
    ];
    const findParams = {
      subscription: true
    };
    before(async () => {
      await User.create(users);
    });
    it('should return an array of all users', async () => {
      const userData = await userRepository.getAllUsers();
      assert.lengthOf(userData, users.length);
    });
    it('should return an array of users with subscription', async () => {
      const userData = await userRepository.getAllUsersByField(findParams);
      assert.lengthOf(userData, 2);
    });
    after(async () => {
      await User.remove({
        email: {
          $in: [users[0].email, users[1].email, users[2].email]
        }
      });
    });
  });
});
