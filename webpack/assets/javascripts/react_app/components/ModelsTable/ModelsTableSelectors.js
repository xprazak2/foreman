const modelsTableState = state => state.models;

export const modelsTablePagination = state => modelsTableState(state).pagination;
export const modelsTableItemCount = state => modelsTableState(state).itemCount;
