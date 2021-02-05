import { toLonLat } from 'ol/proj';
import React from 'react';
import { ListItem } from 'src/types';
import { List } from 'semantic-ui-react';
import { useMainTemplateDispatch } from 'src/template/main/MainProvider';


interface Props {
  item: ListItem;
}
function RecordListItem({ item } : Props) {
  const dispatch = useMainTemplateDispatch();
  const handleClick = () => {
    const center = toLonLat(item.coordinate);
    dispatch({
      type : 'SET_CENTER',
      payload : center
    });
  };
  return (
    <List.Item onClick={handleClick}>
      <List.Icon name={item.iconType} size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>{item.title}</List.Header>
        <List.Description>{item.content}</List.Description>
      </List.Content>
    </List.Item>
  );
}

export default RecordListItem;
