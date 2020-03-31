import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Form, Input, Icon, message, Button } from 'antd';

const SignIn = ({ form }) => {
  const [signedIn, setSignedIn] = useState(false);

  const authenticate = (user) => {
    const url = 'https://igive-2.herokuapp.com/api/dashboard/authenticate';
    axios
      .post(url, user)
      .then((result) => {
        localStorage.setItem('token', result.data.id_token);
        window.location.pathname = '/studies';
        setSignedIn(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          message.error('The username or password provided were incorrect');
        } else {
          message.error('Please try again later');
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        authenticate(values);
      } else console.log(err);
    });
  };

  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  if (signedIn) {
    return <Redirect to={from} />;
  }

  const { getFieldDecorator } = form;

  return (
    <Col span={16} offset={4}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item className="form-item" required>
          {getFieldDecorator('username', {
            rules: [
              {
                type: 'email',
                message: 'This not a valid email address',
              },
              {
                required: true,
                message: 'Please input your username',
              },
            ],
            validateTrigger: 'onBlur',
            validateFirst: true,
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="User name or email"
              type="email"
              addonBefore="User"
              name="username"
            />,
          )}
        </Form.Item>

        <Form.Item className="form-item" required>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password',
                whitespace: true,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              addonBefore="Password"
              name="password"
            />,
          )}
        </Form.Item>

        <Row type="flex" justify="center">
          <Col>
            <Link to="/recover-password">
              <Button type="link">I forgot my password</Button>
            </Link>
          </Col>
        </Row>

        <Form.Item className="form-item">
          <Button type="primary" htmlType="submit" block>
            SIGN IN
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

SignIn.propTypes = {
  form: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};

SignIn.defaultProps = {
  form: {},
  getFieldDecorator: null,
};

export default Form.create()(SignIn);
