import { SET_MOTIVE } from '../type';

export const GetDataDashboardMentor = (data: any) => async (dispatch: any) => {
  dispatch({ type: SET_MOTIVE, value: data });
};
