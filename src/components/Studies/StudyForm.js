import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Button } from 'antd';

import IconUpload from '../IconUpload';

import { DATA_OPTIONS } from '../../lib/constants';
import { Select } from '../FormFields';

import appFrame from '../../assets/appFrame.png';

import StyledForm from '../../styled/shared/StyledForm';

const StudyForm = ({ study, form, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const formItemLayout = {
    // The layout of label
    labelCol: {
      span: 24,
    },
    // The layout for input controls
    wrapperCol: {
      span: 24,
    },
  };

  const institutionToIcon = (institution) => ({
    uid: institution.id,
    url: institution.logo,
    type: institution.logoContentType,
  });
  const iconToInstitution = (icon) => ({
    // TODO discuss w Fernando about adding name to the API
    name: icon.name,
    logo: icon.url,
    logoContentType: icon.type,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { requestedData, institutionIcons, icon, ...rest } = values;
        const updatedValues = {
          ...rest,
          icon: icon[0].url,
          iconContentType: icon[0].type,
          institutions: institutionIcons.map(iconToInstitution),
          requestedData: requestedData.toString(),
        };
        setIsLoading(true);
        onSubmit(updatedValues).then(() => setIsLoading(false));
      } else console.log(err);
    });
  };

  const { getFieldDecorator } = form;
  const files =
    study && study.id ? [{ uid: study.id, url: study.icon, type: study.iconContentType }] : [];
  const hasMoreIcons = study && study.id && study.institutions.length > 0;
  const institutionFiles = hasMoreIcons ? study.institutions.map(institutionToIcon) : [];
  return (
    <Row gutter={24}>
      <Col lg={{ span: 12 }} md={{ span: 8 }} sm={{ span: 6 }} xs={{ span: 12 }}>
        <StyledForm {...formItemLayout} onSubmit={handleSubmit}>
          <StyledForm.Item
            className="form-item upload"
            required
            label={
              <>
                <div className="question-number">1</div>Study Icon
              </>
            }
            colon={false}
          >
            {getFieldDecorator('icon', {
              initialValue: files,
              rules: [
                { required: true, message: 'Please enter a study icon' },
                {
                  validator: (rule, value, callback) => {
                    try {
                      if (value.length > 1) {
                        throw new Error('Maximum of 1 icon!');
                      }
                    } catch (err) {
                      callback(err);
                      return;
                    }
                    callback();
                  },
                  message: 'Please remove 1 icon. Only 1 study icon can be uploaded',
                },
                {
                  validator: (rule, value, callback) => {
                    console.log(value);
                    try {
                      if (value[0] && value[0].size > 250000) {
                        throw new Error('Maximum size for icons is 250KB!');
                      }
                    } catch (err) {
                      callback(err);
                      return;
                    }
                    callback();
                  },
                  message: 'Please make sure provided icon is under 250KB',
                },
              ],
            })(<IconUpload files={files} placeholder="Study Icon" />)}
          </StyledForm.Item>

          <StyledForm.Item
            className="form-item"
            required
            label={
              <>
                <div className="question-number">2</div>Study Name
              </>
            }
            colon={false}
          >
            {getFieldDecorator('name', {
              initialValue: study.name,
              rules: [{ required: true, message: 'Please enter a study name' }],
            })(<Input type="text" name="name" placeholder="Study Name" />)}
          </StyledForm.Item>

          <StyledForm.Item
            className="form-item"
            required
            label={
              <>
                <div className="question-number">3</div>Study Description
              </>
            }
            colon={false}
          >
            {getFieldDecorator('description', {
              initialValue: study.description,
              rules: [{ required: true, message: 'Please enter a description' }],
            })(<Input.TextArea rows={4} type="textarea" placeholder="Study Description" />)}
          </StyledForm.Item>

          <StyledForm.Item
            className="form-item"
            required
            label={
              <>
                <div className="question-number">4</div>Contact e-mail
              </>
            }
            colon={false}
          >
            {getFieldDecorator('contactEmail', {
              initialValue: study.contactEmail,
              rules: [
                { required: true, message: 'Please enter an email' },
                { type: 'email', message: 'Please enter a valid email' },
              ],
            })(<Input type="email" placeholder="Contact email" />)}
          </StyledForm.Item>

          <StyledForm.Item
            className="form-item"
            required
            label={
              <>
                <div className="question-number">5</div>Data Required
              </>
            }
            colon={false}
          >
            {getFieldDecorator('requestedData', {
              initialValue: study.requestedData && study.requestedData.split(','),
              rules: [{ required: true, message: 'Please select one or more data inputs' }],
            })(<Select placeholder="Select Study Data" options={DATA_OPTIONS} />)}
          </StyledForm.Item>

          <StyledForm.Item
            className="form-item"
            required
            label={
              <>
                <div className="question-number">6</div>Data requirement justification
              </>
            }
            colon={false}
          >
            {getFieldDecorator('dataJustification', {
              initialValue: study.dataJustification,
              rules: [{ required: true, message: 'Please enter a justification' }],
            })(
              <Input.TextArea
                rows={4}
                type="textarea"
                placeholder="For GDPR reasons you have to define here why you need each data type"
              />,
            )}
          </StyledForm.Item>

          <StyledForm.Item
            className="form-item"
            label={
              <>
                <div className="question-number">7</div>Study Website
              </>
            }
            colon={false}
          >
            {getFieldDecorator('website', {
              initialValue: study.website || 'http://',
              rules: [
                {
                  type: 'url',
                  message: 'Please enter a valid URL starting with http:// or https://',
                },
              ],
            })(<Input type="textarea" />)}
          </StyledForm.Item>

          <StyledForm.Item
            className="form-item upload"
            label={
              <>
                <div className="question-number">7</div>Upload Institution Icons
              </>
            }
            colon={false}
          >
            {getFieldDecorator('institutionIcons', {
              initialValue: institutionFiles,
              rules: [
                {
                  validator: (rule, value, callback) => {
                    try {
                      if (value.length && value[value.length - 1].size > 250000) {
                        throw new Error('Maximum size for icons is 250KB!');
                      }
                    } catch (err) {
                      callback(err);
                      return;
                    }
                    callback();
                  },
                  message: 'Please make sure provided icon is under 250KB',
                },
              ],
            })(<IconUpload files={institutionFiles} />)}
          </StyledForm.Item>

          <StyledForm.Item>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              SAVE CHANGES
            </Button>
          </StyledForm.Item>
        </StyledForm>
      </Col>
      <Col lg={{ span: 12 }} md={{ span: 8 }} sm={{ span: 6 }} xs={{ span: 12 }}>
        <Row type="flex" justify="start">
          <img src={appFrame} className="mobile-frame" alt="mobile app screenshot" />
        </Row>
      </Col>
    </Row>
  );
};

StudyForm.propTypes = {
  study: PropTypes.object,
  form: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

StudyForm.defaultProps = {
  study: {},
  form: {},
};

export default Form.create()(StudyForm);
