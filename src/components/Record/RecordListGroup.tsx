import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useMainTemplateState } from 'src/template/main/MainProvider';
import { ListItem } from 'src/types';
import RecordListItem from './RecordListItem';

function RecordListGroup() {
  const { data } = useMainTemplateState();
  
  return (
    <ListGroup as="ul">
      {
        data.map((item, index) => <RecordListItem key={index} item={item}/>)
      }
    </ListGroup>
  );
}

export default RecordListGroup;
