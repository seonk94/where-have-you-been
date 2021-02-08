import React, { useState } from 'react';
import Map from 'src/components/map/Map';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'src/components/layers/TileLayer';
import Layers from 'src/components/layers/Layers';
import Controls from 'src/components/controls/Controls';
import FullScreenControl from 'src/components/controls/FullScreenControl';
import { osm } from 'src/lib/utils';
import MarkerOverlay from 'src/components/overlay/MarkerOverlay';
import NewMarkerOverlay from 'src/components/overlay/NewMarkerOverlay';
import MapAlert from 'src/components/map/MapAlert';
import { useMainTemplateState } from './MainProvider';

function MainMap() {
  const { center, data, editMode } = useMainTemplateState();

  return (
    <Map center={fromLonLat(center)} zoom={9}>
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
