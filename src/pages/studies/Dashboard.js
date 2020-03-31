import React from 'react';
import { Tabs, message } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import FileSaver from 'file-saver';

import { useFetch } from '../../lib/hooks/useFetch';
import AppLayout from '../../components/Layout';
import StudyData from '../../components/Studies/StudyData';
import StudyForm from '../../components/Studies/StudyForm';
import ManageParticipants from '../../components/Studies/ManageParticipants';
import ManageForms from '../../components/Studies/ManageForms';

import * as api from '../../lib/api';

const StudiesDashboard = () => {
  const { id } = useParams();
  const { hash } = useLocation();

  // TO DO: refactor because /dashboard/study/data/${id} returns both the study info as well as the participant data
  const [studyData] = useFetch(`/dashboard/study/data/${id}`, []);
  const [study, setStudyUrl] = useFetch(`/dashboard/study/${id}`, {});
  const [invitations, setUrl] = useFetch(`/dashboard/study/${id}/invitations`, []);
  const [forms, setFormsUrl] = useFetch(`/dashboard/study/${id}/forms/info`, []);

  const requestedData =
    studyData.data.studyDTO &&
    studyData.data.studyDTO.requestedData &&
    studyData.data.studyDTO.requestedData.split(',');

  const activeKey = (hash && hash.replace('#', '')) || 'data';

  const editStudy = (update) => {
    return api
      .put('/dashboard/study', { id, ...update })
      .then(() => {
        message.success('Study updated successfully');
        setStudyUrl(`/dashboard/study/${id}?ts=${Date.now()}`);
      })
      .catch((error) => {
        console.log(error);
        message.error('Study could not be updated');
      });
  };

  const inviteParticipant = (email) => {
    return api
      .post(`/dashboard/invitations/${id}`, { email })
      .then((response) => {
        if (response.status === 208) {
          message.warning('Participant was already invited');
        } else {
          message.success('Invitation sent successfully');
        }
        setUrl(`/dashboard/study/${id}/invitations?ts=${Date.now()}`);
      })
      .catch((error) => {
        console.log(error);
        message.error('Invitation could not be sent');
      });
  };

  const reinviteParticipant = (participant) => {
    return api
      .post(`/dashboard/mail/resend/${participant}`)
      .then(() => {
        message.success('Invitation sent successfully');
        setUrl(`/dashboard/study/${id}/invitations?ts=${Date.now()}`);
      })
      .catch((error) => {
        console.log(error);
        message.error('Invitation could not be sent');
      });
  };

  const deleteParticipant = (participant) => {
    return api
      .del(`/dashboard/invitations/${participant}`)
      .then(() => {
        message.success('Participant invitation deleted successfully');
        setUrl(`/dashboard/study/${id}/invitations?ts=${Date.now()}`);
      })
      .catch((error) => {
        console.log(error);
        message.error('Participant invitation could not be deleted');
      });
  };

  const createForm = (formData) => {
    return api
      .post(`/dashboard/forms/${id}`, formData)
      .then((response) => {
        message.success('Form created successfully');
        window.location.pathname = `/studies/${id}/forms/${response.data.id}`;
        return response;
      })
      .catch(() => {
        message.error('Form could not be created');
      });
  };

  const updateForm = (formData) => {
    return api
      .put(`/dashboard/forms`, {
        id: formData.idForm,
        state: formData.state,
        name: formData.name,
        description: formData.description,
      })
      .then((response) => {
        message.success('Form successfully updated');
        setFormsUrl(`/dashboard/study/${id}/forms/info?ts=${Date.now()}`);
        return response;
      })
      .catch(() => {
        message.error('Form could not be upated');
      });
  };

  const deleteForm = (formId) => {
    return api
      .del(`/dashboard/forms/${formId}`)
      .then((response) => {
        message.success('Form successfully deleted');
        setFormsUrl(`/dashboard/study/${id}/forms/info?ts=${Date.now()}`);
        return response;
      })
      .catch(() => {
        message.error('Form could not be deleted');
      });
  };

  const downloadStudyData = () => {
    return api
      .get(`/dashboard/download/study/${id}`, { responseType: 'blob' })
      .then((res) => FileSaver.saveAs(res.data, `${id}.zip`));
  };

  const downloadStudyForms = () => {
    return api
      .get(`/dashboard/download/study/${id}/forms`, { responseType: 'blob' })
      .then((res) => FileSaver.saveAs(res.data, `${id}-forms.zip`));
  };

  const downloadForm = (formId) => {
    return api
      .get(`/dashboard/download/form/${formId}`, { responseType: 'blob' })
      .then((res) => FileSaver.saveAs(res.data, `${id}-form-${formId}.zip`));
  };

  const pendingRequests = study.isLoading || invitations.isLoading;

  return (
    <AppLayout title={study.data.name}>
      {!pendingRequests && (
        <Tabs
          activeKey={activeKey}
          onChange={(activeK) => {
            window.location.replace(`#${activeK}`);
          }}
          tabBarStyle={{ borderBottom: '0' }}
        >
          <Tabs.TabPane tab="STUDY DATA" key="data">
            <StudyData
              downloadAction={downloadStudyData}
              requestedData={requestedData}
              data={studyData.data.studyParticipantManage}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="EDIT STUDY" key="edit">
            <StudyForm
              study={study.data}
              onSubmit={editStudy}
              onCancel={() => window.location.replace(`#data`)}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="MANAGE PARTICIPANTS" key="participants">
            <ManageParticipants
              invitations={invitations.data}
              onDelete={deleteParticipant}
              onInvite={inviteParticipant}
              onReinvite={reinviteParticipant}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="FORMS" key="forms">
            <ManageForms
              create={createForm}
              update={updateForm}
              remove={deleteForm}
              download={downloadForm}
              downloadAll={downloadStudyForms}
              studyId={id}
              forms={forms.data}
            />
          </Tabs.TabPane>
        </Tabs>
      )}
    </AppLayout>
  );
};

export default StudiesDashboard;
