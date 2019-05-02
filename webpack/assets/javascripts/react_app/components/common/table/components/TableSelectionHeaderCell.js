import React from 'react';
import PropTypes from 'prop-types';
import { Table as PfTable } from 'patternfly-react';
import { noop } from 'foremanReact/common/helpers';

const TableSelectionHeaderCell = ({
  id, label, checked, onChange, ...props
}) => (
  <PfTable.SelectionHeading aria-label={label}>
    <PfTable.Checkbox
      id={id}
      label={label}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  </PfTable.SelectionHeading>
);

TableSelectionHeaderCell.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

TableSelectionHeaderCell.defaultProps = {
  id: 'selectAll',
  label: '',
  checked: false,
  onChange: noop,
};

export default TableSelectionHeaderCell;
