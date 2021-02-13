import { toLonLat } from 'ol/proj';
import React from 'react';
import { List } from 'semantic-ui-react';
import { useMainTemplateDispatch } from 'src/template/main/MainProvider';
import { Record } from 'src/lib/graphql/record';
import styled from 'styled-components';

const Icon = styled(List.Icon)`
  width: 32px !important;
  min-width: 40px;
  height: 32px !important;
  padding-right: 8px !important;
  display: table-cell !important;
`;

interface Props {
  item: Record;
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
      <Icon name={item.iconType} size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>{item.title}</List.Header>
        <List.Description>{item.content}</List.Description>
      </List.Content>
    </List.Item>
  );
}

export default RecordListItem;
