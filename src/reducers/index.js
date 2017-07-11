import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import authenReducer from './auth_reducer';

const rootReducer = combineReducers({
  form,
  auth: authenReducer
});

export default rootReducer;
