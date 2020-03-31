import styled from 'styled-components';
import theme from './Theme';

const StyledPage = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(${theme.secondaryColor}, ${theme.tertiaryColor});
  min-height: 100vh;
`;

export default StyledPage;
