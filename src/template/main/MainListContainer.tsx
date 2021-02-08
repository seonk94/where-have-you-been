import React from 'react';
import RecordListGroup from 'src/components/Record/RecordListGroup';
import RecordListActionBar from 'src/components/Record/RecordListActionBar';

function MainListContainer() {
  return (
    <>
      <RecordListActionBar/>
      <RecordListGroup/>
    </>
  );
}

export default MainListContainer;
