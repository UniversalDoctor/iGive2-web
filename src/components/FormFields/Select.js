import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select as AntSelect } from 'antd';

import StyledDataIcon from '../../styled/shared/StyledDataIcon';

const { Option } = AntSelect;

// Select needs to be a class component to work well with antd validation
// eslint-disable-next-line react/prefer-stateless-function
export class Select extends Component {
  render() {
    const { placeholder, options, ...rest } = this.props;
    return (
      <AntSelect
        {...rest}
        mode="multiple"
        style={{ width: '100%' }}
        placeholder={placeholder}
        allowClear
        showArrow
      >
        {options.map((op) => (
          <Option key={op.value} value={op.value} label={op.label}>
            <span role="img" aria-label={op.label}>
              <StyledDataIcon src={op.icon} alt="" />
            </span>
            {op.label}
          </Option>
        ))}
      </AntSelect>
    );
  }
}

Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default Select;
