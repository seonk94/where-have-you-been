import React, { useState } from 'react';
import Map from 'src/components/map/Map';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'src/components/layers/TileLayer';
import Layers from 'src/components/layers/Layers';
import Controls from 'src/components/controls/Controls';
import FullScreenControl from 'src/components/controls/FullScreenControl';
import { osm, vector } from 'src/utils';
import styled from 'styled-components';
import { Col, Container, Row } from 'react-bootstrap';


function MainTemplate() {
  const [center, setCenter] = useState([126.949860, 37.586954]);
  const [zoom, setZoom] = useState(9);

  return (
    <Container fluid>
      <Row noGutters>
        <Col xs={12} md={8}>
          <Map center={fromLonLat(center)} zoom={zoom}>
            <Layers>
              <TileLayer
                source={osm()}
                zIndex={0}
              />
              {/* <VectorLayer
              source={vector({ features : new GeoJSON().readFeatures(geojsonObject, { featureProjection : get('EPSG:3857') }) })}
              zIndex={0}
              style={styles.MultiPolygon}
            /> */}
            </Layers>
            <Controls>
              <FullScreenControl />
            </Controls>
          </Map>
            
        </Col>
        <Col xs={12} md={4}>

        </Col>
      </Row>
    </Container>
  );
}

export default MainTemplate;
