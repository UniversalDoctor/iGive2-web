import React from 'react';
import { Layout, Tabs, Row, Col } from 'antd';

import StyledPage from '../../styled/shared/StyledPage';
import StyledLogo from './StyledLogo';
import SignIn from '../../components/Authentication/SignIn';
import SignUp from '../../components/Authentication/SignUp';
import logo from '../../assets/iGive2_logo.png';

const Authentication = () => {
  return (
    <StyledPage>
      <Layout style={{ background: 'none' }}>
        <Row type="flex" justify="center">
          <Col>
            <StyledLogo src={logo} alt="iGive2 logo" />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={12} style={{ textAlign: 'center' }}>
            <Tabs tabBarStyle={{ borderBottom: '0' }} size="small">
              <Tabs.TabPane tab="SIGN IN" key="1">
                <SignIn />
              </Tabs.TabPane>
              <Tabs.TabPane tab="REGISTER" key="2">
                <SignUp />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Layout>
    </StyledPage>
  );
};

export default Authentication;
