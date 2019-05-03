import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Dropdown, MenuItem } from 'patternfly-react';
import { translate as __ } from '../../common/I18n';

import PageLayout from '../common/PageLayout/PageLayout';
import AuditsList from '../../components/AuditsList';
import Pagination from '../../components/Pagination/Pagination';

import { withBulkActions } from '../../components/BulkActions';

const AuditsPage = ({
  data: { searchProps, docURL, audits, pagination, searchable }, bulkActionsMenu
}) => {
  return (
    <PageLayout
      header={__('Audits')}
      searchable={searchable}
      searchProps={searchProps}
      toolbarButtons={
        <React.Fragment>
          { bulkActionsMenu }
          <Button href={docURL} className="btn-docs">
            <Icon type="pf" name="help" />
            {__(' Documentation')}
          </Button>
        </React.Fragment>
      }
    >
      <div id="audit-list">
        <AuditsList data={audits} />
      </div>
      <div id="pagination">
        <Pagination data={pagination} />
      </div>
    </PageLayout>
);
}

const WrappedAuditsPage = withBulkActions(
  'bulk-actions-dropdown',
  [{ label: 'fake', name: 'Fake Action'}, { label: 'noop', name: 'No op'}],
  AuditsPage
);

AuditsPage.propTypes = {
  data: PropTypes.shape({
    searchProps: PropTypes.shape({
      autocomplete: PropTypes.shape({
        results: PropTypes.array,
        searchQuery: PropTypes.string,
        url: PropTypes.string,
        useKeyShortcuts: PropTypes.bool,
      }),
      controller: PropTypes.string,
      bookmarks: PropTypes.shape({
        text: PropTypes.string,
        query: PropTypes.string,
      }),
    }),
    docURL: PropTypes.string,
    audits: PropTypes.shape({
      audits: PropTypes.array.isRequired,
    }).isRequired,
    pagination: PropTypes.shape({
      viewType: PropTypes.string,
      perPageOptions: PropTypes.arrayOf(PropTypes.number),
      itemCount: PropTypes.number,
      perPage: PropTypes.number,
    }).isRequired,
    searchable: PropTypes.bool,
  }).isRequired,
};

export default WrappedAuditsPage;
