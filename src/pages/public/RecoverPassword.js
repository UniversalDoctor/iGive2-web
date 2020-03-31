import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Layout, Row, Col, Form, Input, Icon, message, Button } from 'antd';

import StyledPage from '../../styled/shared/StyledPage';
import StyledLogo from './StyledLogo';
import StyledInstructions from '../../components/Authentication/StyledInstructions';
import logo from '../../assets/iGive2_logo.png';

const RecoverPassword = ({ form }) => {
  const [redirect, setRedirect] = useState(false);

  const recover = ({ email }) => {
    const url = 'https://igive-2.herokuapp.com/api/account/reset-password/init';
    const headers = { 'Content-Type': 'application/json' };

    axios
      .post(url, email, { headers })
      .then(() => {
        setRedirect(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          message.error(`There is no account for ${email}`);
          form.resetFields();
        } else {
          message.error('Please try again later');
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        recover(values);
      } else console.log(err);
    });
  };

  const { getFieldDecorator } = form;
  const emailAddress = form.getFieldValue('email');

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/recover-password-confirm',
          state: { email: emailAddress },
        }}
      />
    );
  }

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
            <Form layout="horizontal" onSubmit={handleSubmit}>
              <Form.Item required>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'This not a valid email address',
                    },
                    {
                      required: true,
                      message: 'Please input your email',
                    },
                  ],
                  validateTrigger: 'onBlur',
                  validateFirst: true,
                  trigger: 'onChange',
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="User name or email"
                    type="text"
                    addonBefore="Email"
                    name="email"
                  />,
                )}
              </Form.Item>

              <StyledInstructions>
                Enter your email address to receive instructions on how to reset your password
              </StyledInstructions>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  SUBMIT
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout>
    </StyledPage>
  );
};

RecoverPassword.propTypes = {
  form: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};

RecoverPassword.defaultProps = {
  form: {},
  getFieldDecorator: null,
};

export default Form.create()(RecoverPassword);
