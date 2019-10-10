import { getManualURL } from '../../common/helpers';
import { getControllerSearchProps } from '../../constants';

export const MODELS_PAGE_DATA_RESOLVED = 'MODELS_PAGE_DATA_RESOLVED';
export const MODELS_PAGE_DATA_FAILED = 'MODELS_PAGE_DATA_FAILED';
export const MODELS_PAGE_HIDE_LOADING = 'MODELS_PAGE_HIDE_LOADING';
export const MODELS_PAGE_SHOW_LOADING = 'MODELS_PAGE_SHOW_LOADING';
export const MODELS_PAGE_UPDATE_QUERY = 'MODELS_PAGE_UPDATE_QUERY';
export const MODELS_PAGE_CLEAR_ERROR = 'MODELS_PAGE_CLEAR_ERROR';

// export const MODELS_PATH = '/models';
export const MODELS_SEARCH_PROPS = getControllerSearchProps('modelss');
// export const MODELS_MANUAL_URL = version =>
//   `${getManualURL(version)}#4.1.4Auditing`;
