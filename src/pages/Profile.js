import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Select, Icon, message, Button } from 'antd';

import * as api from '../lib/api';
import { useFetch } from '../lib/hooks/useFetch';
import countries from '../assets/countries.json';
import AppLayout from '../components/Layout';

const Profile = ({ form }) => {
  const [editable, setEditable] = useState(false);
  const [user, setUrl] = useFetch('/dashboard/researcher', {});

  const handleEditing = () => {
    setEditable(true);
  };

  const updateProfile = (updatedUser) => {
    api
      .put('/dashboard/board/researcher', updatedUser)
      .then(() => {
        setEditable(false);
        message.success('Profile updated successfully');
        setUrl(`/dashboard/researcher?ts=${Date.now()}`);
      })
      .catch(() => {
        message.error('Profile could not be updated');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { email, ...updatedUser } = values;
        updateProfile(updatedUser);
      } else console.log(err);
    });
  };

  const { Option } = Select;
  const { getFieldDecorator } = form;

  return (
    <AppLayout title="Your Profile">
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" colon={false}>
              {getFieldDecorator('email', {
                initialValue: user.data.email,
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="email"
                  name="email"
                  placeholder="Email"
                  disabled
                />,
              )}
            </Form.Item>

            <Form.Item required={editable} label="First Name" colon={false}>
              {getFieldDecorator('firstName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your first name',
                    whitespace: true,
                  },
                ],
                initialValue: user.data.firstName,
              })(
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  disabled={!editable}
                />,
              )}
            </Form.Item>

            <Form.Item required={editable} label="Last Name" colon={false}>
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Last Name',
                    whitespace: true,
                  },
                ],
                initialValue: user.data.lastName,
              })(
                <Input type="text" name="lastName" placeholder="Last Name" disabled={!editable} />,
              )}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item required={editable} label="Title" colon={false}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your title',
                  },
                  {
                    type: 'enum',
                    enum: ['mr', 'ms', 'dr', 'phd'],
                    message: 'Invalid Title',
                  },
                ],
                initialValue: user.data.title,
              })(
                <Select placeholder="Select Title" name="title" disabled={!editable}>
                  <Option value="mr">Mr</Option>
                  <Option value="ms">Ms</Option>
                  <Option value="dr">Dr</Option>
                  <Option value="phd">PhD</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item required={editable} label="Country" colon={false}>
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your country',
                  },
                ],
                initialValue: user.data.country,
              })(
                <Select
                  placeholder="Select Country"
                  name="country"
                  disabled={!editable}
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

            <Form.Item required={editable} label="Company/Institution" colon={false}>
              {getFieldDecorator('institution', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your institution',
                    whitespace: true,
                  },
                ],
                initialValue: user.data.institution,
              })(
                <Input
                  prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  name="institution"
                  placeholder="Institution"
                  disabled={!editable}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            {!editable ? (
              <Button type="primary" htmlType="button" onClick={handleEditing} block>
                EDIT
              </Button>
            ) : null}
          </Col>

          <Col>
            {editable ? (
              <Button type="primary" htmlType="submit" block>
                SAVE CHANGES
              </Button>
            ) : null}
          </Col>
        </Row>
      </Form>
    </AppLayout>
  );
};

Profile.propTypes = {
  form: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};

Profile.defaultProps = {
  form: {},
  getFieldDecorator: null,
};

export default Form.create()(Profile);
