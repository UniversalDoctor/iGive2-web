import styled from 'styled-components';

import theme from './Theme';

const StyledTile = styled.div`
  position: relative;
  height: ${(props) => (props.type === 'form' ? '200px' : '260px')};
  background-color: ${theme.primaryColor};
  color: ${theme.white};
  border-radius: ${theme.borderRadius};
  padding: ${(props) => (props.type === 'form' ? '0' : `${theme.spacingL} 0 ${theme.spacingM} `)};

  h3 {
    padding-top: ${theme.spacingL};
    color: inherit;
  }

  .tile-row {
    padding: 0 ${theme.spacingM};
  }

  .main {
    height: 65%;
  }

  .side {
    height: 35%;
    opacity: 0.6;
  }

  .logo {
    position: absolute;
    top: -24px;
    width: 100%;
  }
`;

const StyledTileNew = styled(StyledTile)`
  padding: 0;
  opacity: 0.6;
  font-size: 16px;
  cursor: pointer;

  .plus-icon {
    font-size: 32px;
    margin-bottom: ${theme.spacingS};
  }
`;

const StyledTileLogo = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${theme.primaryColor};
`;

export { StyledTile, StyledTileLogo, StyledTileNew };
