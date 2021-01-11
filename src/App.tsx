import React, { useState } from 'react';
import './App.css';
import Map from './components/map/Map';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from './components/layers/TileLayer';
import Layers from './components/layers/Layers';
import VectorLayer from './components/layers/VectorLayer';
import Controls from './components/controls/Controls';
import FullScreenControl from './components/controls/FullScreenControl';
import { osm, vector } from './utils';

const styles = {
  'MultiPolygon' : new Style({
    stroke : new Stroke({
      color : 'blue',
      width : 1
    }),
    fill : new Fill({
      color : 'rgba(0, 0, 255, 0.1)'
    })
  })
};


const App = () => {
  const [center, setCenter] = useState([126.949860, 37.586954]);
  const [zoom, setZoom] = useState(9);

  return (
    <div>
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
    </div>
  );
};

export default App;