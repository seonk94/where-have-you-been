import React, { useState } from 'react';
import Map from 'src/components/map/Map';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'src/components/layers/TileLayer';
import Layers from 'src/components/layers/Layers';
import Controls from 'src/components/controls/Controls';
import FullScreenControl from 'src/components/controls/FullScreenControl';
import { osm } from 'src/utils';
import MarkerOverlay from 'src/components/overlay/MarkerOverlay';
import { ListItem } from 'src/types';
import NewMarkerOverlay from 'src/components/overlay/NewMarkerOverlay';
import MapAlert from 'src/components/map/MapAlert';
import { useMainTemplateState } from './MainProvider';

function MainMap() {
  const [center, setCenter] = useState([126.949860, 37.586954]);
  const [zoom, setZoom] = useState(9);
  const { data, editMode } = useMainTemplateState();

  return (
    <Map center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer
          source={osm()}
          zIndex={0}
        />
      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
      <MapAlert show={editMode}/>
      <NewMarkerOverlay  show={editMode}/>
      {
        data.map((item, index) => (
          <MarkerOverlay key={index} item={item}/>
        ))
      }
    </Map>
  );
}

export default MainMap;
