import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode
}

type NaverMap = naver.maps.Map | null;

interface MapContextInterface {
  map: NaverMap,
  setMap: React.Dispatch<React.SetStateAction<NaverMap>> | null
}

export const MapContext = createContext<MapContextInterface>({ map : null, setMap : null});

function MapProvider({ children } : Props) {
  const [map, setMap] =  useState<NaverMap>(null);
 
  return (
    <MapContext.Provider value={{
      map : map,
      setMap : setMap
    }}>
      {children}
    </MapContext.Provider>
  );
}
export default MapProvider;