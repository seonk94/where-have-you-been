import React, { useState } from 'react';
import Map from 'src/components/map/Map';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'src/components/layers/TileLayer';
import Layers from 'src/components/layers/Layers';
import Controls from 'src/components/controls/Controls';
import FullScreenControl from 'src/components/controls/FullScreenControl';
import { osm, vector } from 'src/utils';
import { Col, Container, Row } from 'react-bootstrap';
import OLOverlay from 'src/components/overlay/Overlay';
import RecordListGroup from 'src/components/list/RecordListGroup';
import { ListItem } from 'src/types';
import { Spacer } from 'src/assets/styles/GlobalStyles';

const dummyCoordinate : ListItem[] = [
  {
    coordinate : [14138144.412188971, 4508760.443846234],
    content : '강남에서...',
    title : '강남',
    iconType : 'BuildingTwo',
    date : '2021-01-01'
  },
  {
    coordinate : [14134951.264779307, 4520037.752975805],
    content : '경복궁에서...',
    title : '경복궁',
    iconType : 'Palace',
    date : '2021-01-01'
  },
  {
    coordinate : [14074875.764536034, 4503258.59338613],
    content : '인천공항에서... 어쩌구 저쩌구 ',
    title : '인천공항',
    iconType : 'Aviation',
    date : '2021-01-01'
  }
];

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
            {
              dummyCoordinate.map((data, index) => (
                <OLOverlay key={index} item={data}/>
              ))
            }
          </Map>
        </Col>
        <Col xs={12} md={4}>
          <RecordListGroup data={dummyCoordinate} setCenter={setCenter}/>
        </Col>
      </Row>
    </Container>
  );
}

export default MainTemplate;
