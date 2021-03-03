import React, { useEffect, useRef, useState } from 'react';
import MapContext from 'src/components/maps/MapProvider';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 48px);
`;

function main() {
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    const mapOptions = {
      center : new naver.maps.LatLng(37.3595704, 127.105399),
      zoom : 15
    };
    setNaverMap(new naver.maps.Map('map', mapOptions));
  }, []);
  
  return (
    <MapContext.Provider value={{ naverMap }}>
      <MapContainer>
        <div id="map" ref={mapRef} style={{
          width : '100%',
          height : '100%'
        }}/>
      </MapContainer>
    </MapContext.Provider>
  );
}

export default main;
