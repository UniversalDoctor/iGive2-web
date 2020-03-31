import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';

import { sortByHash } from '../../lib/util/strings';
import AppLayout from '../../components/Layout';
import { useFetch } from '../../lib/hooks/useFetch';
import { StyledTile, StyledTileLogo, StyledTileNew } from '../../styled/shared/StyledTiles';

const StudiesList = () => {
  const [{ data }] = useFetch('/dashboard/studies', []);

  return (
    <AppLayout title="Your Studies">
      <Row gutter={36}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 6 }}
          xl={{ span: 4 }}
          style={{ marginBottom: '36px' }}
        >
          <Link to="/studies/new">
            <StyledTileNew>
              <Row type="flex" align="middle" style={{ height: '100%' }}>
                <Col span={24}>
                  <Row type="flex" justify="center">
                    <Col>
                      <Icon type="plus-circle" className="plus-icon" />
                    </Col>
                  </Row>
                  <Row type="flex" justify="center">
                    <Col>NEW STUDY</Col>
                  </Row>
                </Col>
              </Row>
            </StyledTileNew>
          </Link>
        </Col>
        {data
          .sort((a, b) => sortByHash(a.id, b.id))
          .map((study) => (
            <Col
              key={study.id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              xl={{ span: 4 }}
              style={{ marginBottom: '36px' }}
            >
              <Link
                to={{
                  pathname: `/studies/${study.id}`,
                  state: {
                    title: study.name,
                  },
                }}
                key={study.id}
              >
                <StyledTile key={study.id}>
                  {study.icon ? (
                    <Row className="tile-row logo" type="flex" justify="center">
                      <Col>
                        <StyledTileLogo
                          src={`data:image/png;base64,${study.icon}`}
                          alt={study.name}
                        />
                      </Col>
                    </Row>
                  ) : null}
                  <Row className="tile-row">
                    <Col>
                      <h3>{study.name.toUpperCase()}</h3>
                    </Col>
                  </Row>
                  <Row className="tile-row">
                    <Col>
                      <p>{study.description}</p>
                    </Col>
                  </Row>
                  <Row className="tile-row" type="flex" align="middle">
                    <Col span={3}>
                      <Icon type="team" />
                    </Col>
                    <Col span={21}>
                      <div>{study.activeParticipants} active users</div>
                    </Col>
                  </Row>
                </StyledTile>
              </Link>
            </Col>
          ))}
      </Row>
    </AppLayout>
  );
};

export default StudiesList;
