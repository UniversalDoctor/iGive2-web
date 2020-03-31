import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Switch, Button, Divider, Icon, Menu, Dropdown } from 'antd';

import { sortByHash } from '../../lib/util/strings';
import FormModal from '../Forms/FormModal';
import { StyledTile, StyledTileNew } from '../../styled/shared/StyledTiles';

const ManageForms = ({ studyId, forms, create, remove, update, download, downloadAll }) => {
  const [showFormCreationForm, setShowFormCreationForm] = useState(false);

  const handleCreate = (values) => {
    create(values).then(() => {
      setShowFormCreationForm(false);
    });
  };

  const handleCancel = () => {
    setShowFormCreationForm(false);
  };

  const showModal = () => {
    setShowFormCreationForm(true);
  };

  const handleSwitchClick = (form) => (checked, e) => {
    e.stopPropagation();
    update({ ...form, state: checked ? 'PUBLISHED' : 'DRAFT' });
  };

  const menu = (form) => (
    <Menu style={{ minWidth: '140px' }}>
      {/* <Menu.Item key="1">View Results</Menu.Item>
      <Menu.Item key="2">Export to other Study</Menu.Item> */}
      <Menu.Item key="3">
        {form.state === 'PUBLISHED' ? 'Active' : 'Inactive'}
        <Switch
          style={{ float: 'right' }}
          onClick={handleSwitchClick(form)}
          defaultChecked={form.state === 'PUBLISHED'}
        />
      </Menu.Item>
      <Menu.Item key="4" onClick={() => download(form.idForm)}>
        Download form
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5" onClick={() => remove(form.idForm)}>
        Delete form
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row gutter={36}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 6 }}
          xl={{ span: 4 }}
          style={{ marginBottom: '36px' }}
        >
          <StyledTileNew onClick={showModal} type="form">
            <Row type="flex" align="middle" style={{ height: '100%' }}>
              <Col span={24}>
                <Row type="flex" justify="center">
                  <Col>
                    <Icon type="plus-circle" className="plus-icon" />
                  </Col>
                </Row>
                <Row type="flex" justify="center">
                  <Col>NEW FORM</Col>
                </Row>
              </Col>
            </Row>
          </StyledTileNew>
        </Col>
        {forms
          .sort((a, b) => sortByHash(a.idForm, b.idForm))
          .map((formInstance) => (
            <Col
              key={formInstance.idForm}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              xl={{ span: 4 }}
              style={{ marginBottom: '36px' }}
            >
              <StyledTile key={formInstance.idForm} type="form">
                <Link
                  to={{
                    pathname: `/studies/${studyId}/forms/${formInstance.idForm}`,
                  }}
                  key={formInstance.idForm}
                >
                  <Row className="tile-row main">
                    <Row>
                      <Col>
                        <h3>{formInstance.name}</h3>
                      </Col>
                    </Row>
                  </Row>
                </Link>

                <Divider style={{ margin: '0' }} />
                <Row className="tile-row side" type="flex" align="middle" justify="space-between">
                  <Col span={22}>
                    {formInstance.numberOfAnswered === 1
                      ? `${formInstance.numberOfAnswered}
                      response`
                      : `${formInstance.numberOfAnswered} responses`}
                  </Col>
                  <Col span={2}>
                    <Dropdown overlay={menu(formInstance)} trigger={['click']}>
                      <Icon type="more" />
                    </Dropdown>
                  </Col>
                </Row>
              </StyledTile>
            </Col>
          ))}
      </Row>
      <Row>
        <Col>
          <Button
            onClick={downloadAll}
            type="primary"
            icon="download"
            size="large"
            style={{ marginTop: '16px' }}
          >
            Download all forms
          </Button>
        </Col>
      </Row>
      <FormModal
        visible={showFormCreationForm}
        title="Create New Form"
        okText="Create"
        onCancel={handleCancel}
        onSubmit={handleCreate}
      />
    </>
  );
};

ManageForms.propTypes = {
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  downloadAll: PropTypes.func.isRequired,
  forms: PropTypes.array,
  studyId: PropTypes.string,
};

ManageForms.defaultProps = {
  forms: [],
  studyId: '',
};

export default ManageForms;
