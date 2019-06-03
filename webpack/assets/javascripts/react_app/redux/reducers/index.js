import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import bookmarks from './bookmarks';
import statistics from './statistics';
import hosts from './hosts';
import notifications from './notifications';
import toasts from './toasts';
import { reducers as passwordStrengthReducers } from '../../components/PasswordStrength';
import { reducers as breadcrumbBarReducers } from '../../components/BreadcrumbBar';
import { reducers as autoCompleteReducers } from '../../components/AutoComplete';
import { reducers as layoutReducers } from '../../components/Layout';
import { reducers as diffModalReducers } from '../../components/ConfigReports/DiffModal';
import { reducers as editorReducers } from '../../components/Editor';
import { reducers as modelsReducers } from '../../components/ModelsTable';
import { reducers as templateGenerationReducers } from '../../components/TemplateGenerator';
import { reducers as factChartReducers } from '../../components/FactCharts';

// Pages
import { reducers as modelsPageReducers } from '../../routes/Models/ModelsPage';

export function combineReducersAsync(asyncReducers) {
  return combineReducers({
    bookmarks,
    form,
    statistics,
    hosts,
    notifications,
    toasts,
    ...passwordStrengthReducers,
    ...breadcrumbBarReducers,
    ...layoutReducers,
    ...asyncReducers,
    ...autoCompleteReducers,
    ...diffModalReducers,
    ...editorReducers,
    ...modelsReducers,
    ...templateGenerationReducers,
    ...factChartReducers,
    // Pages
    ...modelsPageReducers,
  });
}

export default combineReducersAsync();
