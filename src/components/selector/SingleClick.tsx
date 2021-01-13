import React, { useContext, useEffect } from 'react';
import MapContext from 'src/components/map/MapContext';
import Select from 'ol/interaction/Select';
import { Map } from 'ol';

function SingleClick() {
  const { map } = useContext(MapContext);
  
  useEffect(() => {
    if (!map) return;
    const select = new Select();
    (map as Map).addInteraction(select);
    select.on('select', function (e) {
      console.log(e);
    });
    return () => {
      if (map) {
        map.removeInteraction(select);
      }
    };
  }, [map]);
  return null;
}
export default SingleClick;