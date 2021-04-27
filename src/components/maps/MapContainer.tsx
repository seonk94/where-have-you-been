import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  
  useEffect(() => {
    const mapOptions = {
      center : new naver.maps.LatLng(37.3595704, 127.105399),
      zoom : 15
    };
    const map = new naver.maps.Map('map', mapOptions);
    setNaverMap(map);
  }, []);
  
  return (
    <Container>
      <MapElement ref={mapRef} id="map" />
    </Container>
  );
}

export default MapContainer;
