import React from 'react';
import MapTemplate from 'src/components/maps/MapTemplate';
import AppToolbar from 'src/components/navbar/AppToolBar';
import RecordProvider from 'src/lib/provider/RecordProvider';

function main() {
 
  return (
    <RecordProvider>
      <AppToolbar/>
      <MapTemplate/>
    </RecordProvider>
  );
}


export default main;
