const SET_PHOTOS = "SET_PHOTOS";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const ADD_PHOTOS = "ADD_PHOTOS";
const RESET_PAGE = "RESET_PAGE";

const defaultState = {
  hits: [],
  isFetching: true,
  page: 1,
  perPage: 20,
  total: 0,
};

export default function photoReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        ...state,
        hits: action.payload.hits,
        total: action.payload.total,
        isFetching: false,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case ADD_PHOTOS:
      return {
        ...state,
        hits: [...state.hits, ...action.payload.hits],
        total: action.payload.total,
        isFetching: false,
      };
    case RESET_PAGE:
      return {
        ...state,
        page: 1,
        hits: [],
      };
    default:
      return state;
  }
}

export const setPhotos = (photos) => ({ type: SET_PHOTOS, payload: photos });
export const setIsFetching = (isFetching) => ({
  type: SET_IS_FETCHING,
  payload: isFetching,
});
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
export const setAddPhotos = (photos) => ({ type: ADD_PHOTOS, payload: photos });
export const setResetPage = () => ({ type: RESET_PAGE });
