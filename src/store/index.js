import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {
};
const enhancers = [];
const middleware = [
    thunk
];
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(composedEnhancers)
);

export default store