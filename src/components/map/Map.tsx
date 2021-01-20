import React, { useRef, useState, useEffect, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import MapContext from './MapContext';
import * as ol from 'ol';


const MapWrapper = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  canvas {
    width: 100%;
  }

  .ol-control {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    padding: 4px;
  }

  .ol-full-screen {
    top: .5em;
    right: .5em;
  }
`;

interface Props {
  children: ReactNode
  center: number[];
  zoom: number;
}
function Map({ children, zoom, center } : Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<ol.Map | null>(null);

  useEffect(() => {
    const options = {
      view : new ol.View({ zoom, center }),
      layers : [],
      controls : [],
      overlays : []
    };
    const mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current as HTMLDivElement);
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);
  
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <MapWrapper ref={mapRef}>
        {children}
      </MapWrapper>
    </MapContext.Provider>
  );
}

export default Map;
