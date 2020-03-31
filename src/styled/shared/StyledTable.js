import styled from 'styled-components';

import theme from './Theme';

const StyledProgressBar = styled.div`
  background: ${(props) => (props.text > 99 ? `${theme.confirmColor}` : `${theme.grey}`)};
  border-radius: 18px;
  width: 100px;
  text-align: center;
  font-size: 14px;
`;

export default StyledProgressBar;
