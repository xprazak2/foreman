import Immutable from 'seamless-immutable';

const initialState = Immutable({});

export default (state = initialState, { type, response }) => {
  switch (type) {
    case 'SETTINGS_FORM_SUBMITTED_SUCCESS': {
      return state.set(response.id, response);
    }
    default:
      return state;
  }
};
