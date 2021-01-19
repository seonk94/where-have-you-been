import React, { useContext, useEffect } from 'react';
import MapContext from '../map/MapContext';
import { Map, Overlay } from 'ol';
import { OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
// eslint-disable-next-line import/named
import Icon, { IconType } from '@icon-park/react/es/all';
import { ListItem } from 'src/types';
interface Props {
  item: ListItem;
}
const OLOverlay = ({ item }: Props) => {
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
    <OverlayTrigger placement="top" overlay={
      <Tooltip id="tooltip">
        {item.title}
      </Tooltip>
    }>
      <Icon id="ol-popup" type={item.iconType as IconType} theme="filled" />
    </OverlayTrigger>
  );
};
export default OLOverlay;