import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button } from 'antd';

import StyledProgressBar from '../../styled/shared/StyledTable';

const StudyData = ({ requestedData, data, downloadAction }) => {
  const dataColumns = requestedData.map((dataColumn) => {
    switch (dataColumn) {
      case 'STEPS':
        return { title: 'Steps (steps/day)', dataIndex: dataColumn };
      case 'WEIGHT':
        return { title: 'Weight (kg)', dataIndex: dataColumn };
      case 'BLOODPRESSURE':
        return { title: 'Blood Pressure', dataIndex: dataColumn };
      case 'HEIGHT':
        return { title: 'Height (cm)', dataIndex: dataColumn };
      case 'HEARTRATE':
        return { title: 'Heart rate (beats/min)', dataIndex: dataColumn };
      case 'BREATHINGPATTERN':
        return { title: 'Breathing Pattern', dataIndex: dataColumn };
      default:
        return null;
    }
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: 150,
    },
    {
      title: 'Forms completed',
      dataIndex: 'forms',
      width: 150,
      render: (text) => <StyledProgressBar text={text}>{text}%</StyledProgressBar>,
    },
    ...dataColumns,
  ];

  const formattedData = data.map((participant) => {
    const partialData = {
      key: participant.anonymousParticipantId,
      forms: participant.percentage,
    };

    const submittedData = participant.dataMean.map((dataPoint) => ({
      [dataPoint.dataType]: dataPoint.meanValue,
    }));

    const flattenedData = submittedData.reduce((a, b) => Object.assign(a, b), {});

    return { ...partialData, ...flattenedData };
  });

  return (
    <>
      <Row>
        <Col>
          <Table columns={columns} dataSource={formattedData} scroll={{ x: 1300 }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={downloadAction}
            type="primary"
            icon="download"
            size="large"
            style={{ marginTop: '16px' }}
          >
            Download
          </Button>
        </Col>
      </Row>
    </>
  );
};

StudyData.propTypes = {
  requestedData: PropTypes.array,
  data: PropTypes.array,
  downloadAction: PropTypes.func.isRequired,
};

StudyData.defaultProps = {
  requestedData: [],
  data: [],
};

export default StudyData;
