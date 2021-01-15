import React, { useContext, useEffect } from 'react';
import MapContext from 'src/components/map/MapContext';
import Select from 'ol/interaction/Select';
import { Feature, Map } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import OLVectorLayer from 'ol/layer/Vector';
import { vector } from 'src/utils';
interface Props {
  geometry: number[];
  name: string  
}

function Marker({ geometry, name }: Props) {
  const { map } = useContext(MapContext);
  
  useEffect(() => {
    if (!map) return;
    const feature = new Feature({
      name,
      geometry : new Point(fromLonLat(geometry))
    });


    feature.setStyle(
      new Style({
        image : new Icon({
          crossOrigin : 'anonymous',
          // src : 'src/assets/images/icons/testpng.png',
          scale : 0.2
        })
      })
    );

    const vectorSource = vector({
      features : [feature]
    });

    const vectorLayer = new OLVectorLayer({
      source : vectorSource,
      zIndex : 100
    });
    map.addLayer(vectorLayer);
    return () => {
      if (map) {
        
      }
    };
  }, [map]);
  return null;
}
export default Marker;