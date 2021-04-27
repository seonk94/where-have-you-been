import React, { useContext, useEffect, useRef, useState } from 'react';
import AddOverlay from 'src/components/maps/AddOverlay';

import RecordProvider, { useMainTemplateState } from 'src/lib/provider/RecordProvider';
import styled from 'styled-components';
import { MapContext } from 'src/lib/provider/MapProvider';

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
`;

function MapTemplate() {
  const { map, setMap } = useContext(MapContext);

  const { data } = useMainTemplateState();
  
  useEffect(() => {
    const mapOptions = {
      center : new naver.maps.LatLng(37.3595704, 127.105399),
      zoom : 15
    };
    const map = new naver.maps.Map('map', mapOptions);
    if (setMap) {
      setMap(map);
    }
  }, []);

  useEffect(() => {
    if (map) {
      data.forEach(marker => {
        new naver.maps.Marker({
          map,
          position : new naver.maps.LatLng(marker.coordinate[0], marker.coordinate[1])
        });
      });
    }
  }, [data]);
  
  return (
    <MapContainer>
      <div id="map" style={{
        width : '100%',
        height : '100%'
      }}/>
    </MapContainer>
  );
}

export default MapTemplate;
