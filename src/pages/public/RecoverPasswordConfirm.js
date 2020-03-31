import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Row, Col, Button } from 'antd';

import StyledPage from '../../styled/shared/StyledPage';
import StyledLogo from './StyledLogo';
import StyledInstructions from '../../components/Authentication/StyledInstructions';
import logo from '../../assets/iGive2_logo.png';

const RecoverPasswordConfirm = () => {
  const location = useLocation();
  const { email } = location.state || { email: '' };

  return (
    <StyledPage>
      <Layout style={{ background: 'none' }}>
        <Row type="flex" justify="center">
          <Col>
            <StyledLogo src={logo} alt="iGive2 logo" />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={8}>
            <StyledInstructions>We just send an email to {email}</StyledInstructions>
            <StyledInstructions>
              Click the secure link to recover you password. If you did not receive an email in your
              Inbox, do not forget to check your Spam folder.
            </StyledInstructions>
            <StyledInstructions>
              Once you are done you can come back here to sign in.
            </StyledInstructions>
            <Link to="/signin">
              <Button type="primary" block>
                SIGN IN
              </Button>
            </Link>
          </Col>
        </Row>
      </Layout>
    </StyledPage>
  );
};

export default RecoverPasswordConfirm;
