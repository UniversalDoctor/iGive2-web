import styled from 'styled-components';
import { Form } from 'antd';

import theme from './Theme';

const StyledForm = styled(Form)`
  align-items: flex-start;

  .form-item {
    font-weight: 600;
    margin: 1em auto;
  }

  .question-number {
    color: ${theme.white};
    font-size: 16px;
    display: inline-block;
    width: ${theme.spacingL};
    height: ${theme.spacingL};
    background-color: ${theme.primaryColor};
    border-radius: 50%;
    text-align: center;
    margin-right: ${theme.spacingS};
  }
`;

export default StyledForm;
