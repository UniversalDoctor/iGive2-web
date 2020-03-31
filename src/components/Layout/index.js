import React from 'react';
import PropTypes from 'prop-types';

import { Layout, PageHeader } from 'antd';
import Header from './Header';
import StyledPage from '../../styled/shared/StyledPage';
import StyledContent from './StyledContent';

const AppLayout = ({ children, title, subtitle, pageHeaderExtra }) => {
  return (
    <StyledPage>
      <Layout style={{ background: 'none' }}>
        <Header />
        <PageHeader
          title={title}
          extra={pageHeaderExtra}
          // breadcrumb={{ routes }}
          subTitle={subtitle}
        />
        <StyledContent>{children}</StyledContent>
      </Layout>
    </StyledPage>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  pageHeaderExtra: PropTypes.array,
};

AppLayout.defaultProps = {
  title: null,
  subtitle: '',
  pageHeaderExtra: null,
};

export default AppLayout;
