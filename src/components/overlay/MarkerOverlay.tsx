import React, { createRef, memo, useContext, useEffect } from 'react';
import MapContext from '../map/MapContext';
import { Map, Overlay } from 'ol';
import { Icon, Popup } from 'semantic-ui-react';
import { Record } from 'src/lib/graphql/record';
interface Props {
  item: Record;
}
const MarkerOverlay = ({ item }: Props) => {
  const { map } = useContext(MapContext);
  const iconRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!map) return;
    const overlay = new Overlay({
      element : iconRef.current as HTMLElement
    });
    (map as Map).addOverlay(overlay);
    overlay.setPosition(item.coordinate);
  }, [map]);

  return (
    <Popup 
      content={item.title} size="tiny" position="right center" 
      trigger={
        <div ref={iconRef}>
          <Icon id={item._id} name={item.iconType} />
        </div>
      } 
    />
  );
};
export default memo(MarkerOverlay);