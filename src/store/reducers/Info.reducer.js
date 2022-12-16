import { SET_INFO_DATA } from "./../constants/Info.constant";

const initialState = {
  listInfo: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case SET_INFO_DATA:
    return { ...state, listInfo: payload };
  default:
    return state;
  }
};
