
import { handleActions } from 'redux-actions';


import {
    APP_SET_USER,
} from '../actions/app';

const defaultState = {
    user: null,
};


export default handleActions(
    {
        [APP_SET_USER]: (state, action) => {
            if (!action.payload) {
                return {
                    ...state,
                    user: null,
                }
            } else {
                return { ...state, user: { ...state.user, ...action.payload } }
            }
        },
    },
    defaultState,
);
