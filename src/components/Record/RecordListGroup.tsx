import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { ListItem } from 'src/types';
import RecordListItem from './RecordListItem';

const dummyCoordinate : ListItem[] = [
  {
    coordinate : [14138144.412188971, 4508760.443846234],
    content : '강남에서...',
    title : '강남',
    iconType : 'BuildingTwo',
    date : '2021-01-01'
  },
  {
    coordinate : [14134951.264779307, 4520037.752975805],
    content : '경복궁에서...',
    title : '경복궁',
    iconType : 'Palace',
    date : '2021-01-01'
  },
  {
    coordinate : [14074875.764536034, 4503258.59338613],
    content : '인천공항에서... 어쩌구 저쩌구 ',
    title : '인천공항',
    iconType : 'Aviation',
    date : '2021-01-01'
  }
];


function RecordListGroup() {
  return (
    <ListGroup as="ul">
      {
        dummyCoordinate.map((item, index) => <RecordListItem key={index} item={item}/>)
      }
    </ListGroup>
  );
}

export default RecordListGroup;
