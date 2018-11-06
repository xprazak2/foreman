import React from 'react';
import Proptypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Paginator } from 'patternfly-react';
import { getURI, getURIpage, getURIperPage, changeQuery, translatePagination } from './PaginationHelper';
import './pagination.scss';

const Pagination = (props) => {
  if (props.data) {
    return erbPagination(props.data);
  }
  return paginationRow(props);
}

const erbPagination = (data) => {
  const pagination = ({
    page: getURIpage() || 1,
    perPage: getURIperPage() || data.perPage,
    perPageOptions: data.perPageOptions,
  });

  const className = isEmpty(data.classNames) ? 'col-md-12' : `col-md-12 ${data.classNames.pagination_classes}`;

  return (
    <Paginator
      pagination={pagination}
      viewType={data.viewType}
      itemCount={data.itemCount}
      onPageSet={page => changeQuery(getURI(), { page })}
      onPerPageSelect={perPage => changeQuery(getURI(), { per_page: perPage })}
      messages={translatePagination(Paginator.defaultProps.messages)}
      className={className}
    />
  );
}


const initPagination = (paginationFromProps) => {
  const pagination = paginationFromProps || {};

  const defaultPagination = {
    page: 1,
    perPage: 20,
    perPageOptions: [5, 10, 15, 20, 25, 50],
  };

  return { ...defaultPagination, ...pagination };
};

const paginationRow = (props) => {
  const {
    onPageSet,
    onPerPageSelect,
    pagination,
    dropdownButtonId,
    itemCount,
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
      itemCount={itemCount}
      pagination={initPagination(pagination)}
      onPageSet={onPageSetUpdate}
      onPerPageSelect={onPerPageSelectUpdate}
      dropdownButtonId={dropdownButtonId}
    />
  );
}


Pagination.propTypes = {
  data: Proptypes.shape({
    viewType: Proptypes.string,
    perPageOptions: Proptypes.arrayOf(Proptypes.number),
    itemCount: Proptypes.number,
    perPage: Proptypes.number,
  }),
  itemCount: Proptypes.number,
  pagination: Proptypes.shape({
    page: Proptypes.number,
    perPage: Proptypes.number,
    perPageOptions: Proptypes.arrayOf(Proptypes.number),
  }),
  onPageSet: Proptypes.func,
  onPerPageSelect: Proptypes.func,
  dropdownButtonId: Proptypes.string,
  onChange: Proptypes.func,
};

export default Pagination;
