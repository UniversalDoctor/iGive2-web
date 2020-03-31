import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Badge, Icon, Modal, Form, Input, Popconfirm, Button } from 'antd';

import StyledActionIcons from './StyledActionIcons';

const ManageParticipants = ({ form, invitations, onInvite, onReinvite, onDelete }) => {
  const [showInviteForm, setShowInviteForm] = useState(false);

  const handleInvite = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      onInvite(values.email).then(() => setShowInviteForm(false));
    });
  };

  const showModal = () => {
    setShowInviteForm(true);
  };

  const handleCancel = () => {
    setShowInviteForm(false);
  };

  const handleDeleteParticipant = (paritciapantId) => {
    onDelete(paritciapantId);
  };

  const handleReinvite = (participantId) => {
    onReinvite(participantId);
  };

  const columns = [
    {
      title: 'Participant',
      dataIndex: 'email',
    },
    {
      title: 'Invitation Status',
      dataIndex: 'state',
      render: (text) => (
        <Badge status={text ? 'success' : 'default'} text={text ? 'Accepted' : 'Pending'} />
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <StyledActionIcons>
          {!record.state ? (
            <Popconfirm
              placement="bottomLeft"
              title="Do you want to send another invitation to this participant?"
              okText="Send"
              onConfirm={() => handleReinvite(record.key)}
            >
              <Icon type="mail" className="action-icon" />
            </Popconfirm>
          ) : null}
          <Popconfirm
            placement="bottomLeft"
            title="Are you sure you want to delete this participant? This action cannot be undone"
            okText="Delete"
            onConfirm={() => handleDeleteParticipant(record.key)}
          >
            <Icon type="delete" className="action-icon" />
          </Popconfirm>
        </StyledActionIcons>
      ),
    },
  ];

  const invitationsWithKey = invitations.map((invitation) => ({
    ...invitation,
    key: invitation.id,
  }));

  const { getFieldDecorator } = form;

  return (
    <>
      <Row type="flex" justify="center" style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <Table columns={columns} dataSource={invitationsWithKey} pagination={{ pageSize: 20 }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button icon="user-add" size="large" onClick={showModal}>
            Add participants
          </Button>
        </Col>
      </Row>
      <Modal
        visible={showInviteForm}
        title="Invite a new participant"
        okText="Send Invite"
        onCancel={handleCancel}
        onOk={handleInvite}
      >
        <Form layout="horizontal">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please enter an email' },
                { type: 'email', message: 'Please enter a valid email' },
              ],
            })(<Input type="email" addonBefore="Email" placeholder="Enter participant email" />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ManageParticipants.defaultProps = {
  invitations: [],
  onDelete: null,
  onInvite: null,
  onReinvite: null,
};

ManageParticipants.propTypes = {
  form: PropTypes.object.isRequired,
  invitations: PropTypes.array,
  onDelete: PropTypes.func,
  onInvite: PropTypes.func,
  onReinvite: PropTypes.func,
};

export default Form.create()(ManageParticipants);
