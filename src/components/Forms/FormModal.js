import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Switch } from 'antd';

const FormModal = ({ data = {}, form, visible, title, okText, onSubmit, onCancel }) => {
  const handleCreate = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit({ ...values, state: values.state ? 'PUBLISHED' : 'DRAFT' });
    });
  };

  const cancel = () => {
    form.resetFields();
    onCancel();
  };

  const { getFieldDecorator } = form;

  return (
    <Modal visible={visible} title={title} okText={okText} onCancel={cancel} onOk={handleCreate}>
      <Form>
        <Form.Item label="Form name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please name your form',
                whitespace: true,
              },
            ],
            initialValue: data.name,
          })(<Input type="text" placeholder="The form title participants will see" />)}
        </Form.Item>

        <Form.Item label="Form description">
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'Please set a form description',
                whitespace: true,
              },
            ],
            initialValue: data.description,
          })(
            <Input.TextArea
              type="textArea"
              rows={4}
              placeholder="A description of the form to explain its purpose"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('state', {
            initialValue: data.state === 'PUBLISHED',
          })(
            <Switch
              checkedChildren="Active"
              unCheckedChildren="Inactive"
              checked={form.getFieldValue('state') === true}
            />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

FormModal.propTypes = {
  data: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  okText: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form.create()(FormModal);
