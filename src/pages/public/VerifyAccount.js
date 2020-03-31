import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Button } from 'antd';

import StyledPage from '../../styled/shared/StyledPage';
import StyledLogo from './StyledLogo';
import StyledInstructions from '../../components/Authentication/StyledInstructions';
import logo from '../../assets/iGive2_logo.png';

const VerifyAccount = (props) => {
  const { location: { state = 'you' } = {} } = props;

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
            <StyledInstructions>
              An email has been sent to {state}! Check your email account and follow the
              instructions in the email to verify your iGive2 Account. Then you can return here to
              sign in to your Account.
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

VerifyAccount.propTypes = {
  location: PropTypes.object,
};

VerifyAccount.defaultProps = {
  location: {},
};

export default VerifyAccount;
