import React, { useContext, useEffect } from 'react';
import MapContext from '../map/MapContext';
import { Map, Overlay } from 'ol';
import { Icon, Popup } from 'semantic-ui-react';
import { Record } from 'src/lib/graphql/record';
import { toLonLat } from 'ol/proj';
interface Props {
  item: Record;
}
const MarkerOverlay = ({ item }: Props) => {
  const { map } = useContext(MapContext);
  
  useEffect(() => {
    if (!map) return;
    const overlay = new Overlay({
      element : document.getElementById(String(item._id)) as HTMLElement
    });
    (map as Map).addOverlay(overlay);
    // console.log(item.coordinate);
    overlay.setPosition(item.coordinate);

    // (map as Map).on('singleclick', (e) => {
    //   const coordinate = e.coordinate;
    //   console.log(coordinate);
    //   const hdms = toStringHDMS(toLonLat(coordinate));
    //   overlay.setPosition(coordinate);
    // });

  }, [map]);

  // useEffect(() => {
  //   if (!map) return;
  //   console.log('setposition');
  //   overlay.setPosition(toLonLat(item.coordinate));
  // }, [item]);
  return (
    <Popup content={item.title} size="tiny" position="right center" trigger={<Icon id={item._id} name={item.iconType} />} />
  );
};
export default MarkerOverlay;