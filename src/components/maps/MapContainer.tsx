import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { MapContext } from 'src/lib/provider/MapProvider';
import AddOverlay from './AddOverlay';

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
`;

const MapElement = styled.div`
  width: 100%;
  height: 100%;
  position: absolute !important;
  top: 0;
  left: 0;
`;

function MapContainer() {
  const { map, setMap } = useContext(MapContext);

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
  
  return (
    <Container>
      <MapElement id="map" />
      <AddOverlay/>
    </Container>
  );
}

export default MapContainer;
