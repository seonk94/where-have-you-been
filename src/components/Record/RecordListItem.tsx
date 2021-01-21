import { toLonLat } from 'ol/proj';
import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { ListItem } from 'src/types';
// eslint-disable-next-line import/named
import Icon, { IconType } from '@icon-park/react/es/all';
import styled from 'styled-components';
import { Spacer } from 'src/assets/styles/GlobalStyles';

const ListRow = styled(Row)`
  align-items: center;
`;

const ListTitle = styled.span`
  padding: 0 4px;
  font-size: 1.125rem;
  font-weight: 500;
`;

interface Props {
  item: ListItem;
  clickHandler: React.Dispatch<React.SetStateAction<number[]>>;
}
function RecordListItem({ item, clickHandler } : Props) {
  return (
    <ListGroup.Item action onClick={() => clickHandler(toLonLat(item.coordinate))}>
      <ListRow noGutters>
        <Icon id="ol-popup" size="20" type={item.iconType as IconType} theme="filled" />
        <ListTitle>{item.title}</ListTitle>
        <Spacer />
        <span>
          {item.date}
        </span>
      </ListRow>
      <div>
        { item.content }
      </div>
    </ListGroup.Item>
  );
}

export default RecordListItem;
