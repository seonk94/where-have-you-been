import { useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import MapContext from 'src/components/maps/MapProvider';
import RecordProvider, { useMainTemplateState } from 'src/components/maps/RecordProvider';
import { CreateRecordResponse, CREATE_RECORD } from 'src/lib/graphql/record';
import { MarkerClustering } from 'src/lib/utils/MarkerClustering';
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
    
    const marker1 = new naver.maps.Marker({
      map,
      position : new naver.maps.LatLng(37.3595704, 127.105399)
    });

    // naver.maps.Event.addListener(map, 'click', (e) => {
    //   const coordinate = [e.coord.y, e.coord.x]; 
    //   createRecord({
    //     variables : {
    //       date : '2021-03-04',
    //       title : 'title',
    //       content : 'Content',
    //       coordinate,
    //       userId : 1
    //     }
    //   });
    // });
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
      </MapContainer>
    </MapContext.Provider>
  );
}

export default main;
