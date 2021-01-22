import React, { useContext, useEffect } from 'react';
import MapContext from '../map/MapContext';
import { Map, Overlay } from 'ol';
import { Button, ButtonGroup, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
// eslint-disable-next-line import/named
import Icon, { IconType } from '@icon-park/react/es/all';
import { ListItem } from 'src/types';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  width: 160px;
  padding: 8px 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconButton = styled(Button)`
  align-items: center;
  display: flex;
  padding: 4px;
  margin: 4px;
`;

const NewMarkerOverlay = () => {
  const { map } = useContext(MapContext);
  
  useEffect(() => {
    if (!map) return;
    const overlay = new Overlay({
      element : document.getElementById('new-overlay') as HTMLElement
    });
    (map as Map).addOverlay(overlay);

    (map as Map).on('singleclick', (e) => {
      const coordinate = e.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      overlay.setPosition(coordinate);
    });

  }, [map]);
  return (
    <Popover id="new-overlay">
      <TitleWrapper>
        추가하시겠습니까?
      </TitleWrapper>
      <ButtonWrapper>
        <IconButton variant="outline-dark">
          <Icon type="CloseSmall" theme="filled" size="18"/>
        </IconButton>
        <IconButton variant="outline-dark">
          <Icon type="Check" theme="filled" size="18"/>
        </IconButton>
      </ButtonWrapper>
    </Popover>
  );
};
export default NewMarkerOverlay;