import React from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';

import AppLayout from '../../components/Layout';
import StudyForm from '../../components/Studies/StudyForm';
import * as api from '../../lib/api';

const CreateNewStudy = () => {
  const history = useHistory();
  const createStudy = (data) => {
    return api
      .post('/dashboard/study', data)
      .then(() => {
        history.push('/studies');
        message.success('Study created successfully');
      })
      .catch((error) => {
        console.log(error);
        message.error('Study could not be created');
      });
  };
  return (
    <AppLayout title="Create New Study">
      <StudyForm onSubmit={createStudy} onCancel={history.goBack} />
    </AppLayout>
  );
};

export default CreateNewStudy;
