import {fromJS} from 'immutable';

import {REHYDRATE} from 'redux-persist/lib/constants';

import * as Actions from './constants';

import {SIGN_OUT_SUCCESS} from 'src/modules/auth/constants';

export const initState = {
  cart_key: null,
  cart_data: [],
  cart_loading: false,
  cart_list_loading: false,
  cart_remove_loading: false,
  cart_update_loading: false,
  cart_update_add_coupon_loading: false,
  cart_update_delete_coupon_loading: false,
};

function cartReducer(state = initState, {type, payload}) {
  switch (type) {
    case SIGN_OUT_SUCCESS:
    case Actions.CLEAR_CART:
      return initState;
    case Actions.GET_CART:
      return state
      case Actions.ADD_TO_CART:
        console.log(state);
        console.log('swf', payload);
        return {
          ...state,
          cart_data: [
            ...state.cart_data,
            payload
          ]
        }
        case Actions.REMOVE_FROM_CART:
          return  {
            ...state,
            cart_data: [
              ...state.cart_data.filter(a => a.id !== payload.id),
              
            ]
          }
    default:
      return state;
  }
}

export default cartReducer;
