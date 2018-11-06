import React from 'react';
import PropTypes from 'prop-types';
import { Paginator } from 'patternfly-react';

const defaultPerPageOptions = [5, 10, 15, 20, 25, 50];

const initPagination = (paginationFromProps) => {
  const pagination = paginationFromProps || {};

  const defaultPagination = {
    page: 1,
    perPage: 20,
    perPageOptions: defaultPerPageOptions,
  };
  return { ...defaultPagination, ...pagination };
};

const PaginationRow = (props) => {
  const {
    onPageSet,
    onPerPageSelect,
    pagination,
    dropdownButtonId,
    ...otherProps,
  } = props;

  const onPageSetUpdate = (page) => {
    update({ page });
    onPageSet(page);
  };

  const onPerPageSelectUpdate = (perPage) => {
    update({ perPage, page: 1 });
    onPerPageSelect(perPage);
  };

  const update = (changes) => {
    const newPagination = { ...props.pagination, ...changes };

    props.onChange({
      page: newPagination.page,
      perPage: newPagination.perPage,
    });
  };

  return (
    <Paginator
      { ...otherProps }
      pagination={initPagination(pagination)}
      onPageSet={onPageSetUpdate}
      onPerPageSelect={onPerPageSelectUpdate}
      dropdownButtonId={dropdownButtonId}
    />
  );
};

PaginationRow.defaultPerPageOptions = defaultPerPageOptions;

PaginationRow.defaultProps = {
  onChange: () => {},
  ...Paginator.defaultProps,
};

PaginationRow.propTypes = {
  ...Paginator.propTypes,
  /** page and per-page selection callback */
  onChange: PropTypes.func,
  pagination: PropTypes.shape({
    /** the current page */
    page: PropTypes.number,
    /** the current per page setting */
    perPage: PropTypes.number,
    /** per page options */
    perPageOptions: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default PaginationRow;
