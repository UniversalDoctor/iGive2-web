import React, { useState } from 'react';
import { Button, Icon, message } from 'antd';
import { useParams } from 'react-router-dom';

import * as api from '../../lib/api';
import { useFetch } from '../../lib/hooks/useFetch';
import FormModal from '../../components/Forms/FormModal';
import AppLayout from '../../components/Layout';
import FormCreationForm from '../../components/Forms/FormCreationForm';

const CreateForm = () => {
  const { formId } = useParams();
  const [form, setUrl] = useFetch(`/dashboard/forms/${formId}`, []);
  const formName = form.data.name;
  const formDescription = form.data.description;

  const [visible, setVisible] = useState(false);

  const updateForm = (formData) => {
    return api
      .put(`/dashboard/forms`, { id: formId, ...formData })
      .then((response) => {
        message.success('Form successfully updated');
        setUrl(`/dashboard/forms/${formId}?ts=${Date.now()}`);
        return response;
      })
      .catch(() => {
        message.error('Form could not be created');
      });
  };

  const handleEdit = (values) => {
    updateForm(values).then(() => {
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <AppLayout
      title={formName}
      subtitle={formDescription}
      pageHeaderExtra={[
        <Button type="link" onClick={showModal}>
          <Icon type="edit" /> Edit form
        </Button>,
      ]}
    >
      <FormModal
        data={form.data}
        visible={visible}
        title={form.data.name}
        okText="Save"
        onCancel={handleCancel}
        onSubmit={handleEdit}
      />
      <FormCreationForm formID={formId} />
    </AppLayout>
  );
};

export default CreateForm;
