import { SET_MOTIVE } from '../type';

const initialState = {
  selectedMotive: '',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MOTIVE:
      return {
        ...state,
        selectedMotive: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
