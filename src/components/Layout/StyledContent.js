import styled from 'styled-components';
import { Layout } from 'antd';

import theme from '../../styled/shared/Theme';

const StyledContent = styled(Layout.Content)`
  padding: ${theme.spacingM};
`;

export default StyledContent;
