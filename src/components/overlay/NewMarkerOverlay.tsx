import React, { useContext, useEffect, useState } from 'react';
import MapContext from '../map/MapContext';
import { Map, Overlay } from 'ol';
import { Button, ButtonGroup, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
// eslint-disable-next-line import/named
import Icon, { IconType } from '@icon-park/react/es/all';
import { ListItem } from 'src/types';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import styled from 'styled-components';

const NewOverlayWrapper = styled.div<{ show : boolean}>`
  display: ${(props) => props.show ? 'block' : 'none'};
`;

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
interface Props {
  show: boolean;
}

const NewMarkerOverlay = ({ show } : Props) => {
  const { map } = useContext(MapContext);
  const [showMarker, setShowMarker] = useState(true);

  
  useEffect(() => {
    if (!map) return;
    const overlay = new Overlay({
      element : document.getElementById('new-overlay') as HTMLElement
    });
    (map as Map).addOverlay(overlay);

    (map as Map).on('singleclick', (e) => {
      setShowMarker(true);
      const coordinate = e.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      overlay.setPosition(coordinate);
    });
  }, [map]);

  const handleAdd = () => {
    setShowMarker(false);
  };

  return (
    <NewOverlayWrapper show={show} id="new-overlay">
      {showMarker && <Popover id="popover">
        <TitleWrapper>
          추가하시겠습니까?
        </TitleWrapper>
        <ButtonWrapper>
          <IconButton variant="outline-dark" onClick={handleAdd}>
            <Icon type="CloseSmall" theme="filled" size="18"/>
          </IconButton>
          <IconButton variant="outline-dark" onClick={handleAdd}>
            <Icon type="Check" theme="filled" size="18"/>
          </IconButton>
        </ButtonWrapper>
      </Popover>}
    </NewOverlayWrapper>
  );
};
export default NewMarkerOverlay;