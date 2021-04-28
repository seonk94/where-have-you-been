import React, { useContext } from 'react';
import MainTemplate from 'src/components/template/MainTemplate';
import { firebaseAuth } from 'src/lib/provider/AuthProvider';
import MapProvider from 'src/lib/provider/MapProvider';
import RecordProvider from 'src/lib/provider/RecordProvider';



function board() {
  const { user } = useContext(firebaseAuth);

  
  return (
    <RecordProvider userId={user?.uid || ''}>
      <MapProvider>
        <MainTemplate/>
      </MapProvider>
    </RecordProvider>
  );
}

export default board;
