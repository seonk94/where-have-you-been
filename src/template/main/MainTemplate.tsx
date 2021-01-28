import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MainProvider from './MainProvider';
import MainMap from './MainMap';
import MainListContainer from './MainListContainer';

function MainTemplate() {

  return (
    <MainProvider>
      <Container fluid>
        <Row style={{ paddingTop : '12px', paddingBottom : '12px' }}>
          <Col xs={12} md={8}>
            <MainMap/>
          </Col>
          <Col xs={12} md={4}>
            <MainListContainer />
          </Col>
        </Row>
      </Container>
    </MainProvider>
  );
}

export default MainTemplate;
