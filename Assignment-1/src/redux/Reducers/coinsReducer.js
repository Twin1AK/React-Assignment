import { ACTIONS } from "../Actions/actions";


const initialState = {
  coinsData: [], // Initial empty array for coins data
  coinChains: [],
  selectedCoin:{}
};

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_COINS:
      return {
        ...state,
        coinsData: action.payload,
      };
    case ACTIONS.SET_COINS_CHAIN:
      return {
        ...state,
        coinChains: action.payload
      };
    case ACTIONS.SET_SELECTED_COIN:
      return {
        ...state,
        selectedCoin: action.payload
      };
    case ACTIONS.SET_TARGET_CURRENCY:
      return {
        ...state,
        targetCurrency: action.payload
      };
    case ACTIONS.SET_DUMMY_IMGS:
      return {
        ...state,
        imgs: action.payload
      }
    
      
    default:
      return state;
  }
};

export default coinsReducer;
