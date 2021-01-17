import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { ListItem } from 'src/types';
import RecordListItem from './RecordListItem';

interface Props {
  data: Array<ListItem>;
  setCenter: React.Dispatch<React.SetStateAction<number[]>>;
}
function RecordListGroup({ data, setCenter }: Props) {
  return (
    <ListGroup as="ul">
      {
        data.map((item, index) => <RecordListItem key={index} clickHandler={setCenter} item={item}/>)
      }
    </ListGroup>
  );
}

export default RecordListGroup;
