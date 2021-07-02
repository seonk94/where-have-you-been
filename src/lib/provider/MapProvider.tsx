import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode
}

type NaverMap = naver.maps.Map | null;
type NaverMarker = naver.maps.Marker;
interface MapContextInterface {
  map: NaverMap;
  setMap: React.Dispatch<React.SetStateAction<NaverMap>> | null;
}

export const MapContext = createContext<MapContextInterface>({ map : null, setMap : null });

function MapProvider({ children } : Props) {
  const [map, setMap] =  useState<NaverMap>(null);
  return (
    <MapContext.Provider value={{
      map,
      setMap  
    }}>
      {children}
    </MapContext.Provider>
  );
}
export default MapProvider;