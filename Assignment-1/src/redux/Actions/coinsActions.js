import { ACTIONS } from "./actions";

export const setCoins = (coinsData) => ({
  type: ACTIONS.SET_COINS,
  payload: { coinsData },
});
export const setCoinChains = (coinsChainData) => ({
  type: ACTIONS.SET_COINS_CHAIN,
  payload: { coinsChainData },
});
export const setSelectedCoin = (selectedCoin) => ({
  type: ACTIONS.SET_SELECTED_COIN,
  payload: {selectedCoin}
})
export const setTargetCurrency = (targetCurrency) => ({
  type: ACTIONS.SET_TARGET_CURRENCY,
  payload: {targetCurrency}
})

export const setDummyImgs = (imgs) => ({
  type: ACTIONS.SET_DUMMY_IMGS,
  payload: {imgs}

})