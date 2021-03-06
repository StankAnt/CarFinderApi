import * as Router from 'koa-router';

import {
  getBodyTypes,
  getMarks,
  getModels,
  getSavedFilters,
  removeAllSavedFilters,
  removeSavedFilterById,
  saveFilter
} from '../controllers/filterController';

const router = new Router();

router.get('/marks', getMarks);
router.get('/bodyTypes', getBodyTypes);
router.post('/models', getModels);
router.get('/saved', getSavedFilters);
router.post('/saved', saveFilter);
router.delete('/saved/all', removeAllSavedFilters);
router.delete('/saved/:id', removeSavedFilterById);

export default router;
