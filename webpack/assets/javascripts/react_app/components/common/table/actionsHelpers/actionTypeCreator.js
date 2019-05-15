const createTableActionTypes = (controller, actionName) => ({
  REQUEST: `${controller.toUpperCase()}_${actionName.toUpperCase()}_TABLE_REQUEST`,
  SUCCESS: `${controller.toUpperCase()}_${actionName.toUpperCase()}_TABLE_SUCCESS`,
  FAILURE: `${controller.toUpperCase()}_${actionName.toUpperCase()}_TABLE_FAILURE`,
});

export default createTableActionTypes;
