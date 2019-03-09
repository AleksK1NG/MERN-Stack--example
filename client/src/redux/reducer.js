import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from '../ducks/auth';
import itemsReducer from '../ducks/items';
import history from '../history';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  router: connectRouter(history)
});
