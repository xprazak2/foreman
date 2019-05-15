import API from '../../../API';

export const ajaxRequestAction = ({
  dispatch,
  requestAction,
  successAction,
  failedAction,
  url,
  item = {},
  requestType = 'get'
}) => {
  dispatch({ type: requestAction, payload: item });
  return API[requestType].call(API, url, item.headers || {}, item.params || {})
    .then(({ data }) =>
      dispatch({ type: successAction, payload: { ...item, ...data } })
    )
    .catch(error => dispatch({ type: failedAction, payload: { error, item } }));
};
