import React, { createContext } from 'react';

const MapContext = createContext<{ naverMap : naver.maps.Map | null}>({ naverMap : null});

export default MapContext;