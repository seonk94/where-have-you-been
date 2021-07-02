import React, { useContext, useEffect } from 'react';

import { MapContext } from 'src/lib/provider/MapProvider';
import { Record} from 'src/lib/graphql/record';

interface Props {
  record: Record;
}
function Marker({ record } : Props) {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    const marker = new naver.maps.Marker({
      map,
      position : new naver.maps.LatLng(record.coordinate[0], record.coordinate[1]),
      icon : {
        content : `
        <div class="marker-div">
          <span role="img">${record.emoji}</span>
        </div>
        `,
        size : new naver.maps.Size(22, 35),
        anchor : new naver.maps.Point(11, 35)
      }
    });
    return () => marker.setMap(null);
  }, []);
  return <></>;
}
export default Marker;