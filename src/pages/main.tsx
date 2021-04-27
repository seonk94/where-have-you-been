import React from 'react';
import MapTemplate from 'src/components/maps/MapTemplate';
import AppToolbar from 'src/components/navbar/AppToolBar';
import RecordProvider from 'src/lib/provider/RecordProvider';
import MapProvider from 'src/lib/provider/MapProvider';
import AddOverlay from 'src/components/maps/AddOverlay';

function main() {
 
  return (
    <MapProvider>
      <RecordProvider>
        <AppToolbar/>
        <MapTemplate/>
        <AddOverlay/>
      </RecordProvider>
    </MapProvider>
  );
}


export default main;
