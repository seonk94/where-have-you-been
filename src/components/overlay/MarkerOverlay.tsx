import React, { useContext, useEffect } from 'react';
import MapContext from '../map/MapContext';
import { Map, Overlay } from 'ol';
import { Icon, Popup } from 'semantic-ui-react';
import { Record } from 'src/lib/graphql/record';
interface Props {
  item: Record;
}
const MarkerOverlay = ({ item }: Props) => {
  const { map } = useContext(MapContext);
  
  useEffect(() => {
    if (!map) return;
    const overlay = new Overlay({
      element : document.getElementById('ol-popup') as HTMLElement
    });
    (map as Map).addOverlay(overlay);
    overlay.setPosition(item.coordinate);

    // (map as Map).on('singleclick', (e) => {
    //   const coordinate = e.coordinate;
    //   console.log(coordinate);
    //   const hdms = toStringHDMS(toLonLat(coordinate));
    //   overlay.setPosition(coordinate);
    // });

  }, [map]);
  return (
    <Popup content={item.title} size="tiny" position="right center" trigger={<Icon id="ol-popup" name={item.iconType} />} />
  );
};
export default MarkerOverlay;