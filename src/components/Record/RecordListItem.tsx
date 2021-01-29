import { toLonLat } from 'ol/proj';
import React from 'react';
import { ListItem } from 'src/types';
// eslint-disable-next-line import/named
import Icon, { IconType } from '@icon-park/react/es/all';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';


interface Props {
  item: ListItem;
}
function RecordListItem({ item } : Props) {
  return (
    <List.Item action >
      <List.Icon name="home" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>{item.title}</List.Header>
        <List.Description>{item.content}</List.Description>
      </List.Content>
      {/* <ListRow noGutters>
        <Icon id="ol-popup" size="20" type={item.iconType as IconType} theme="filled" />
        <ListTitle>{item.title}</ListTitle>
        <Spacer />
        <span>
          {item.date}
        </span>
      </ListRow>
      <div>
        { item.content }
      </div> */}
    </List.Item>
  );
}

export default RecordListItem;
