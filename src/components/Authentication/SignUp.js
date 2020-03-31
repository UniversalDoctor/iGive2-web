import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Col, Row, Form, Input, Select, Icon, Checkbox, message, Button } from 'antd';

import countries from '../../assets/countries.json';

const SignUp = ({ form }) => {
  const [comparePasswords, setComparePasswords] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleConfirmBlur = () => {
    setComparePasswords(true);
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && comparePasswords) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords do not match');
    } else {
      callback();
    }
  };

  const register = (user) => {
    const url = 'https://igive-2.herokuapp.com/api/dashboard/register';
    axios
      .post(url, user)
      .then(() => {
        setRegistered(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          message.error('Email is already in use');
        } else {
          message.error('Please try again later');
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { confirm, ...user } = values;
        register(user);
      } else console.log(err);
    });
  };

  if (registered) {
    const email = form.getFieldValue('email');

    return (
      <Redirect
        to={{
          pathname: '/verify-account',
          state: email,
        }}
      />
    );
  }
  const { Option } = Select;
  const { getFieldDecorator } = form;

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item className="form-item" required label="Email" colon={false} hasFeedback>
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
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email address"
                type="email"
                name="email"
              />,
            )}
          </Form.Item>

          <Form.Item className="form-item" required label="Password" colon={false} hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password',
                  whitespace: true,
                },
                {
                  validator: validateToNextPassword,
                },
                {
                  pattern: '(?=.{8,})',
                  message: 'Password must be at least 8 characters long',
                },
                {
                  pattern: '(?=.*[A-Z])',
                  message: 'Password must contain a capital letter',
                },
                {
                  pattern: '(?=.[!@#$%^&])',
                  message: 'Password must contain a special character',
                },
              ],
              validateFirst: true,
              validateTrigger: 'onBlur',
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                name="password"
              />,
            )}
          </Form.Item>

          <Form.Item
            className="form-item"
            required
            label="Confirm Password"
            colon={false}
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password',
                  whitespace: true,
                },
                {
                  validator: compareToFirstPassword,
                },
                {
                  pattern: '(?=.{8,})',
                  message: 'Password must be at least 8 characters long',
                },
              ],
              validateFirst: true,
              validateTrigger: 'onBlur',
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                name="confirm"
                onBlur={handleConfirmBlur}
              />,
            )}
          </Form.Item>

          <Form.Item className="form-item" required label="Title" colon={false}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please select your title',
                },
              ],
            })(
              <Select placeholder="Select Title" name="title">
                <Option value="mr">Mr</Option>
                <Option value="ms">Ms</Option>
                <Option value="dr">Dr</Option>
                <Option value="phd">PhD</Option>
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className="form-item" required label="First Name" colon={false}>
            {getFieldDecorator('firstName', {
              rules: [
                {
                  required: true,
                  message: 'Please input your first name',
                  whitespace: true,
                },
              ],
            })(<Input type="text" name="firstName" placeholder="First Name" />)}
          </Form.Item>

          <Form.Item className="form-item" required label="Last Name" colon={false}>
            {getFieldDecorator('lastName', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Last Name',
                  whitespace: true,
                },
              ],
            })(<Input type="text" name="lastName" placeholder="Last Name" />)}
          </Form.Item>

          <Form.Item className="form-item" required label="Country" colon={false}>
            {getFieldDecorator('country', {
              rules: [
                {
                  required: true,
                  message: 'Please select your country',
                },
              ],
            })(
              <Select
                placeholder="Select Country"
                name="country"
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {countries.map((country) => (
                  <Option key={country.value} value={country.value}>
                    {country.label}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          <Form.Item className="form-item" required label="Company/Institution" colon={false}>
            {getFieldDecorator('institution', {
              rules: [
                {
                  required: true,
                  message: 'Please select your institution',
                  whitespace: true,
                },
              ],
            })(
              <Input
                prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                name="institution"
                placeholder="Institution"
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <Form.Item className="form-item terms">
            {getFieldDecorator('terms', {
              valuePropName: 'checked',
              rules: [
                {
                  required: true,
                  message: 'Please accept the Terms and Conditions',
                },
              ],
            })(
              <Checkbox>
                <span>I have read and accept the </span>
                <a
                  href="https://www.universaldoctor.com/igive2-terms-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
                <span> of iGive2</span>
              </Checkbox>,
            )}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className="form-item">
        <Button type="primary" htmlType="submit" block>
          SIGN ME UP
        </Button>
      </Form.Item>
    </Form>
  );
};

SignUp.propTypes = {
  form: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};

SignUp.defaultProps = {
  form: {},
  getFieldDecorator: null,
};

export default Form.create()(SignUp);
