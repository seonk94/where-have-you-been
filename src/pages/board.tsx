import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import RecordCardNonBoard from 'src/components/common/RecordCardNonBoard';
import MapContainer from 'src/components/maps/MapContainer';
import Appbar from 'src/components/navbar/Appbar';
import useRecords from 'src/lib/hooks/useRecords';
import { firebaseAuth } from 'src/lib/provider/AuthProvider';
import MapProvider from 'src/lib/provider/MapProvider';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`;
const GridContainer = styled(Grid)`
  flex-grow: 1
`;

const GirdItem = styled(Grid)`
  max-width: 520px !important;
`;


function board() {
  const { user } = useContext(firebaseAuth);
  const { data, loading } = useRecords(user?.uid || '');

  
  return (
    <MapProvider>
      <Container>
        <Appbar/>
        <GridContainer container justify="center"
          alignItems="stretch" direction="row">

          <GirdItem item xs={12} sm={6}>
            <MapContainer/>
            {data?.findRecordsByUserId.data.map((record, index) => <RecordCardNonBoard isFirst={index === 0} record={record} key={record._id} />)}
          </GirdItem>

        </GridContainer>
      </Container>
    </MapProvider>
  );
}

export default board;
