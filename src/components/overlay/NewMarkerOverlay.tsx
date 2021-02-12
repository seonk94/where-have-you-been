import React, { useContext, useEffect, useState } from 'react';
import MapContext from '../map/MapContext';
import { Map, Overlay } from 'ol';
import styled from 'styled-components';
import { useMainTemplateDispatch } from 'src/template/main/MainProvider';
import RecordAddModal from '../Record/RecordAddModal';
import { Button, Icon } from 'semantic-ui-react';

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


const CardWrapper = styled.div`
  margin-left: 5px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1060;
  display: block;
  background: #fff;
  padding: 4px;
`;

const ArrowDiv = styled.div`
  position: absolute;
  display: block;
  left: calc(-.5rem - 1px);
  width: .5rem;
  height: 1rem;
  margin: .3rem 0;

  &::after {
    position: absolute;
    display: block;
    content: "";
    border-color: transparent;
    border-style: solid;

    left: 1px;
    border-width: .5rem .5rem .5rem 0;
    border-right-color: #fff;
  }

  *::before {
    position: absolute;
    display: block;
    content: "";
    border-color: transparent;
    border-style: solid;

    left: 0;
    border-width: .5rem .5rem .5rem 0;
    border-right-color: rgba(0, 0, 0, .25);
  }
`;

interface Props {
  show: boolean;
}

const NewMarkerOverlay = ({ show } : Props) => {
  const { map } = useContext(MapContext);
  const [showMarker, setShowMarker] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [overlay, setOverlay] = useState<null | Overlay>(null);
  const dispatch = useMainTemplateDispatch();
  
  useEffect(() => {
    setOverlay(new Overlay({
      element : document.getElementById('new-overlay') as HTMLElement
    }));
  }, []);

  useEffect(() => {
    if (!map) return;
    if (!overlay) return;
    (map as Map).addOverlay(overlay);

    (map as Map).on('singleclick', (e) => {
      if (!overlay) return;
      setShowMarker(true);
      overlay.setPosition(e.coordinate);
    });
  }, [map, overlay]);


  const handleAdd = () => {
    dispatch({
      type : 'SET_EDIT_MODE',
      payload : false
    });
    setShowMarker(false);
    setShowAddModal(true);
  };

  return (
    <>
      <NewOverlayWrapper show={show} id="new-overlay">
        {showMarker && <CardWrapper id="popover">
          <ArrowDiv/>
          <TitleWrapper>
            추가하시겠습니까?
          </TitleWrapper>
          <ButtonWrapper>
            <Button icon>
              <Icon name="close" />
            </Button>
            <Button icon onClick={handleAdd}>
              <Icon name="check" />
            </Button>
          </ButtonWrapper>
        </CardWrapper>}
      </NewOverlayWrapper>
      {
        showAddModal &&
        <RecordAddModal 
          coordinate={(overlay as Overlay & { values_ : { position: number[] }}).values_.position} 
          show={showAddModal} 
          closeFunction={() => setShowAddModal(false)}/>
      }
    </>
  );
};
export default NewMarkerOverlay;

