import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon, message } from 'antd';

import { useFetch } from '../../lib/hooks/useFetch';
import * as api from '../../lib/api';
import QuestionModal from './QuestionModal';

const FormCreationForm = ({ formID }) => {
  const [{ data, isLoading }, setUrl] = useFetch(`/dashboard/forms/${formID}/questions`, []);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const handleEditQuestion = (questionId) => {
    setShowCreateForm(true);
    setCurrentQuestion(questionId);
  };

  const handleCloseModal = () => {
    setCurrentQuestion(null);
    setShowCreateForm(false);
  };

  const createQuestion = (question) => {
    return api
      .post(`/dashboard/forms/questions/${formID}`, question)
      .then(() => {
        message.success('Question added successfully');
        handleCloseModal();
        // TODO : find better way of updating (useEffect?)
        setUrl(`/dashboard/forms/${formID}/questions?ts=${Date.now()}`);
      })
      .catch(() => {
        message.error('Question could not be added');
      });
  };

  const deleteQuestion = (questionId) => {
    return api
      .del(`/dashboard/forms/questions/${questionId}`)
      .then(() => {
        message.success('Question successfully removed'); // TODO : find better way of updating (useEffect?)
        setUrl(`/dashboard/forms/${formID}/questions?ts=${Date.now()}`);
      })
      .catch(() => {
        message.error('Question could not be added');
      });
  };

  const updateQuestion = (id) => (question) => {
    return api
      .put('/dashboard/forms/questions', { id, ...question })
      .then(() => {
        message.success('Question updated successfully');
        handleCloseModal();
        // TODO : find better way of updating (useEffect?)
        setUrl(`/dashboard/forms/${formID}/questions?ts=${Date.now()}`);
      })
      .catch(() => {
        message.error('Question could not be updated');
      });
  };

  const saveQuestion = currentQuestion ? updateQuestion(currentQuestion) : createQuestion;

  return (
    <>
      {!isLoading && (
        <div>
          <Row>
            {data.map((question, key) => {
              return (
                <Row key={question.id}>
                  <Col span={20}>
                    {key + 1}. Question: {question.question}
                  </Col>
                  <Col span={4}>
                    <Button onClick={() => deleteQuestion(question.id)}>
                      <Icon type="delete" />
                    </Button>
                    <Button onClick={() => handleEditQuestion(question.id)}>
                      <Icon type="edit" />
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Row>

          <Row type="flex" justify="start">
            <Col>
              <Button onClick={() => setShowCreateForm(true)}>
                <Icon type="plus" /> Add question
              </Button>
            </Col>
          </Row>
          {showCreateForm && (
            <QuestionModal
              question={data.find((q) => q.id === currentQuestion) || { options: '' }}
              onCancel={handleCloseModal}
              saveQuestion={saveQuestion}
              showForm={showCreateForm}
            />
          )}
        </div>
      )}
    </>
  );
};

FormCreationForm.propTypes = {
  formID: PropTypes.string.isRequired,
};

export default FormCreationForm;
