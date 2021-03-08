import { useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import AddOverlay from 'src/components/maps/AddOverlay';
import MapContext from 'src/components/maps/MapProvider';
import RecordProvider, { useMainTemplateState } from 'src/lib/provider/RecordProvider';
import { CreateRecordResponse, CREATE_RECORD } from 'src/lib/graphql/record';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
`;

function main() {
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  const [createRecord] = useMutation<CreateRecordResponse>(CREATE_RECORD);
  const { data } = useMainTemplateState();
  useEffect(() => {
    const mapOptions = {
      center : new naver.maps.LatLng(37.3595704, 127.105399),
      zoom : 15
    };
    const map = new naver.maps.Map('map', mapOptions);
    setNaverMap(map);
  }, []);

  useEffect(() => {
    if (naverMap) {
      data.forEach(marker => {
        new naver.maps.Marker({
          map : naverMap,
          position : new naver.maps.LatLng(marker.coordinate[0], marker.coordinate[1])
        });
      });
    }
  }, [data]);
  
  return (
    <MapContext.Provider value={{ naverMap }}>
      <MapContainer>
        <div id="map" ref={mapRef} style={{
          width : '100%',
          height : '100%'
        }}/>
        {
          naverMap && <AddOverlay/>
        }
      </MapContainer>
    </MapContext.Provider>
  );
}

export default main;
