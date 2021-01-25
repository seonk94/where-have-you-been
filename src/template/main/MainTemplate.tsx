import React, { useState, useReducer, createContext, Dispatch, useContext } from 'react';
import Map from 'src/components/map/Map';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'src/components/layers/TileLayer';
import Layers from 'src/components/layers/Layers';
import Controls from 'src/components/controls/Controls';
import FullScreenControl from 'src/components/controls/FullScreenControl';
import { osm, vector } from 'src/utils';
import { Col, Container, Row } from 'react-bootstrap';
import MarkerOverlay from 'src/components/overlay/MarkerOverlay';
import RecordListGroup from 'src/components/Record/RecordListGroup';
import { ListItem } from 'src/types';
import RecordListActionBar from 'src/components/Record/RecordListActionBar';
import NewMarkerOverlay from 'src/components/overlay/NewMarkerOverlay';
import MapAlert from 'src/components/map/MapAlert';
import MainProvider, { useMainTemplateState } from './MainProvider';
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
