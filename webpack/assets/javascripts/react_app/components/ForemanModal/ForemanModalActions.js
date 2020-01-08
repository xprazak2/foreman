import {
  ADD_MODAL,
  SET_MODAL_OPEN,
  SET_MODAL_CLOSED,
} from './ForemanModalConstants';
import { selectModalStateById } from './ForemanModalSelectors';

export const addModal = ({ id, open = false, submitting = false }) => (dispatch, getState) => {
  const modalAlreadyExists = selectModalStateById(getState(), id);
  if (modalAlreadyExists) {
    throw new Error(`ForemanModal with ID ${id} already exists`);
  }
  return dispatch({
    type: ADD_MODAL,
    payload: { id, open, submitting },
  });
};

export const setModalOpen = ({ id }) => (dispatch, getState) => {
  const modalExists = selectModalStateById(getState(), id);
  if (!modalExists) {
    throw new Error(
      `SET_MODAL_OPEN error: Modal with id '${id}' does not exist`
    );
  }
  return dispatch({
    type: SET_MODAL_OPEN,
    payload: { id },
  });
};

// const modalSubmitting = ({ id, actionType }) =>
//   ({ id }) => (dispatch, getState) => {
//     const modalExists = selectModalStateById(getState(), id);
//       if (!modalExists) {
//         throw new Error(
//           `${actionType} error: Modal with id '${id}' does not exist`
//         );
//       }
//       return dispatch({
//         type: actionType,
//         payload: { id }
//       })
//     }
//   }


export const setModalStartSubmitting = ({ id }) => (dispatch, getState) => {
  const modalExists = selectModalStateById(getState(), id);
  if (!modalExists) {
    throw new Error(
      `SET_MODAL_START_SUBMITTING error: Modal with id '${id}' does not exist`
    );
  }
  return dispatch({
    type: SET_MODAL_START_SUBMITTING,
    payload: { id }
  })
}

export const setModalStopSubmitting = ({ id }) => (dispatch, getState) => {
  const modalExists = selectModalStateById(getState(), id);
  if (!modalExists) {
    throw new Error(
      `SET_MODAL_STOP_SUBMITTING error: Modal with id '${id}' does not exist`
    );
  }
  return dispatch({
    type: SET_MODAL_STOP_SUBMITTING,
    payload: { id }
  })
}


export const setModalClosed = ({ id }) => (dispatch, getState) => {
  const modalExists = selectModalStateById(getState(), id);
  if (!modalExists) {
    throw new Error(
      `SET_MODAL_CLOSED error: Modal with id '${id}' does not exist`
    );
  }
  return dispatch({
    type: SET_MODAL_CLOSED,
    payload: { id },
  });
};

// Pass in the ForemanModal id here and get bound action creators with the id already plugged in.
export const bindForemanModalActionsToId = ({ id }) => ({
  addModal: () => addModal({ id }),
  setModalOpen: () => setModalOpen({ id }),
  setModalClosed: () => setModalClosed({ id }),
  setModalStartSubmitting: () => setModalStartSubmitting({ id }),
  setModalStopSubmitting: () => setModalStopSubmitting({ id }),
});
