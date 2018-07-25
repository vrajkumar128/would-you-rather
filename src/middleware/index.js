import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from './logger';

// Create middleware stack
export default applyMiddleware(
  thunk,
  logger
);
