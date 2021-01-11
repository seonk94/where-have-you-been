import { useContext, useEffect } from 'react';
import MapContext from '../map/MapContext';
import OLVectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Geometry from 'ol/geom/Geometry';
import { Style } from 'ol/style';

interface Props {
  source: VectorSource<Geometry>;
  zIndex: number;
  style: Style;
}

const VectorLayer = ({ source, style, zIndex = 0 } : Props) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    const vectorLayer = new OLVectorLayer({
      source,
      style
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);
  return null;
};
export default VectorLayer;