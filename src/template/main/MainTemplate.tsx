import React, { useEffect } from 'react';
import MainProvider from './MainProvider';
import MainMap from './MainMap';
import MainListContainer from './MainListContainer';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled(Grid)`
  margin: 0 !important;
`;

function MainTemplate() {

  return (
    <MainProvider>
      <Container>
        <Grid.Row>
          <Grid.Column mobile={16} computer={10}>
            <MainMap/>
          </Grid.Column>
          <Grid.Column mobile={16} computer={6}>
            <MainListContainer />
          </Grid.Column>
        </Grid.Row>
      </Container>
    </MainProvider>
  );
}

export default MainTemplate;
