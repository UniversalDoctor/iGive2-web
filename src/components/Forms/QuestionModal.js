import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Radio, Tag, Tooltip, Button, Modal } from 'antd';

const hasOptions = (opts) => opts.length > 0;

const showOptions = (form) =>
  form.getFieldValue('type') === 'SINGLECHECKBOX' ||
  form.getFieldValue('type') === 'MULTIPLECHECKBOX';

const QuestionModal = ({ form, question, saveQuestion, onCancel, showForm }) => {
  const inputEl = useRef(null);
  const { getFieldDecorator } = form;
  const { Option } = Select;
  const [options, setOptions] = useState(
    question.options && question.options.split(',').filter(Boolean),
  );
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = (removedOption) => {
    const newOptions = options.filter((option) => option !== removedOption);
    setOptions([...newOptions]);
  };

  useEffect(() => {
    if (inputVisible && inputEl.current) {
      inputEl.current.focus();
    }
  }, [inputVisible, inputEl]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && options.indexOf(inputValue) === -1) {
      setOptions([...options, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const onOk = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (showOptions(form) && options.length > 1) {
          const formattedOptions = options.toString();
          const updatedValues = { ...values, options: formattedOptions };
          saveQuestion(updatedValues).then(() => {
            form.resetFields();
            setOptions([]);
          });
        } else {
          saveQuestion(values).then(() => form.resetFields());
        }
      }
    });
  };

  return (
    <Modal
      visible={showForm}
      title={question.id ? 'Edit question' : 'Add new question'}
      okText={question.id ? 'Update' : 'Save'}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form>
        <Form.Item label="Question" colon={false}>
          {getFieldDecorator('question', {
            rules: [{ required: true, message: 'Please enter the question' }],
            initialValue: question.question,
          })(<Input type="text" placeholder="Enter quesiton here" />)}
        </Form.Item>

        <Form.Item label="Question Type" colon={false}>
          {getFieldDecorator('type', {
            rules: [{ required: true, message: 'Please choose a question type.' }],
            initialValue: question.type,
          })(
            <Select placeholder="Select type" name="type">
              <Option value="FREEANSWER">Text</Option>
              <Option value="FREELONGANSWER">Long text</Option>
              <Option value="SINGLECHECKBOX">Single Choice</Option>
              <Option value="MULTIPLECHECKBOX">Multiple Choice</Option>
              <Option value="DATEANSWER">Calendar</Option>
            </Select>,
          )}
        </Form.Item>

        {showOptions(form) ? (
          <Form.Item
            label="Answer Options"
            colon={false}
            required
            validateStatus={options.length < 2 ? 'error' : 'success'}
            help="Please enter at least two options"
          >
            {hasOptions(options) &&
              options.map((option) => {
                const isLongOption = option.length > 20;
                const optionElem = (
                  <Tag key={option} closable onClose={() => handleClose(option)}>
                    {isLongOption ? `${option.slice(0, 20)}...` : option}
                  </Tag>
                );
                return isLongOption ? (
                  <Tooltip title={option} key={option}>
                    {optionElem}
                  </Tooltip>
                ) : (
                  optionElem
                );
              })}
            {inputVisible && (
              <Input
                ref={inputEl}
                required={showOptions}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Button
                size="small"
                type="dashed"
                onClick={() => {
                  setInputVisible(true);
                }}
              >
                + New Answer Option
              </Button>
            )}
          </Form.Item>
        ) : null}

        <Form.Item>
          {getFieldDecorator('isMandatory', {
            rules: [
              { required: true, message: 'Please choose if this question should be mandatory' },
            ],
            initialValue: question.isMandatory,
          })(
            <Radio.Group>
              <Radio value>Mandatory</Radio>
              <Radio value={false}>Optional</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

QuestionModal.propTypes = {
  form: PropTypes.object,
  getFieldDecorator: PropTypes.func,
  question: PropTypes.object,
  saveQuestion: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  showForm: PropTypes.bool.isRequired,
};

QuestionModal.defaultProps = {
  form: {},
  getFieldDecorator: null,
  question: {},
};

export default Form.create()(QuestionModal);
