import React from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbSwitcher } from 'patternfly-react';
import { Switch, Route, Router } from 'react-router-dom';
import history from '../../history';
import AppSwitcher from '../../routes';

import { noop } from '../../common/helpers';
import Breadcrumb from './components/Breadcrumb';
import './breadcrumbswitcher.scss';

class BreadcrumbBar extends React.Component {
  handleOpen() {
    const {
      data: { resource },
      loadSwitcherResourcesByResource,
      currentPage,
      resourceUrl,
      resourceSwitcherItems,
    } = this.props;
    const isUrlFormatValid = resourceSwitcherItems.length
      ? resourceSwitcherItems[0].url ===
        resource.switcherItemUrl.replace(':id', resourceSwitcherItems[0].id)
      : true;
    if (
      !currentPage ||
      resourceUrl !== resource.resourceUrl ||
      !isUrlFormatValid
    ) {
      loadSwitcherResourcesByResource(resource);
    }
  }

  render() {
    const {
      data: { breadcrumbItems, isSwitchable, resource, wrapWithReactRouter },
      currentPage,
      totalPages,
      resourceSwitcherItems,
      isLoadingResources,
      hasError,
      isSwitcherOpen,
      toggleSwitcher,
      closeSwitcher,
      loadSwitcherResourcesByResource,
      searchQuery,
      removeSearchQuery,
      searchDebounceTimeout,
      onSwitcherItemClick,
      titleReplacement,
    } = this.props;

    const isTitle = breadcrumbItems.length === 1;
    const options = ({ pageIncrement }) => ({
      searchQuery,
      page: Number(currentPage) + pageIncrement,
    });

    const handleSwitcherItemClick = (e, href) => {
      closeSwitcher();
      onSwitcherItemClick(e, href);
    };

    const bar = (
      <div className="breadcrumb-bar">
        <Breadcrumb
          title
          items={breadcrumbItems}
          isTitle={isTitle}
          titleReplacement={titleReplacement}
        >
          {isSwitchable && (
            <BreadcrumbSwitcher
              open={isSwitcherOpen}
              isLoading={isLoadingResources}
              hasError={hasError}
              resources={resourceSwitcherItems}
              currentPage={currentPage}
              totalPages={totalPages}
              onTogglerClick={() => toggleSwitcher()}
              onHide={() => closeSwitcher()}
              onOpen={() => this.handleOpen()}
              onSearchChange={event =>
                loadSwitcherResourcesByResource(resource, {
                  searchQuery: event.target.value,
                })
              }
              onNextPageClick={() =>
                loadSwitcherResourcesByResource(
                  resource,
                  options({ pageIncrement: 1 })
                )
              }
              onPrevPageClick={() =>
                loadSwitcherResourcesByResource(
                  resource,
                  options({ pageIncrement: -1 })
                )
              }
              searchValue={searchQuery}
              onSearchClear={() => removeSearchQuery(resource)}
              searchDebounceTimeout={searchDebounceTimeout}
              onResourceClick={handleSwitcherItemClick}
            />
          )}
        </Breadcrumb>
        {!isTitle && <hr className="breadcrumb-line" />}
      </div>
    );

    if (wrapWithReactRouter) {
      return (
        <Router history={history}>
          <AppSwitcher>
            {bar}
          </AppSwitcher>
        </Router>
      );
    } else {
      return bar;
    }
  }
}

BreadcrumbBar.propTypes = {
  data: PropTypes.shape({
    isSwitchable: PropTypes.bool,
    resource: PropTypes.shape({
      nameField: PropTypes.string,
      resourceUrl: PropTypes.string,
      switcherItemUrl: PropTypes.string,
      resourceFilter: PropTypes.string,
    }),
    breadcrumbItems: Breadcrumb.propTypes.items,
  }),
  searchDebounceTimeout: PropTypes.number,
  searchQuery: PropTypes.string,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  resourceSwitcherItems: BreadcrumbSwitcher.propTypes.resources,
  resourceUrl: PropTypes.string,
  isLoadingResources: PropTypes.bool,
  hasError: PropTypes.bool,
  isSwitcherOpen: PropTypes.bool,
  titleReplacement: PropTypes.string,
  toggleSwitcher: PropTypes.func,
  closeSwitcher: PropTypes.func,
  loadSwitcherResourcesByResource: PropTypes.func,
  onSwitcherItemClick: PropTypes.func,
  removeSearchQuery: PropTypes.func,
};

BreadcrumbBar.defaultProps = {
  data: {
    breadcrumbItems: [],
    isSwitchable: false,
  },
  searchQuery: '',
  currentPage: null,
  totalPages: 1,
  resourceSwitcherItems: [],
  resourceUrl: null,
  isLoadingResources: false,
  hasError: false,
  isSwitcherOpen: false,
  searchDebounceTimeout: 300,
  titleReplacement: null,
  toggleSwitcher: noop,
  closeSwitcher: noop,
  loadSwitcherResourcesByResource: noop,
  onSwitcherItemClick: noop,
  removeSearchQuery: noop,
};

export default BreadcrumbBar;
