import React from 'react';
import { List } from 'semantic-ui-react';
import { useMainTemplateState } from 'src/template/main/MainProvider';
import RecordListItem from './RecordListItem';

function RecordListGroup() {
  const { data } = useMainTemplateState();
  
  return (
    <List divided verticalAlign="middle" selection>
      {
        data.map((item, index) => <RecordListItem key={index} item={item} />)
      }
    </List>
  );
}

export default RecordListGroup;
