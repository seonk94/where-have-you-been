import React from 'react';
import MainProvider from './MainProvider';
import MainMap from './MainMap';
import MainListContainer from './MainListContainer';
import { Grid } from 'semantic-ui-react';

function MainTemplate() {

  return (
    <MainProvider>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={10}>
            <MainMap/>
          </Grid.Column>
          <Grid.Column mobile={16} computer={6}>
            <MainListContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MainProvider>
  );
}

export default MainTemplate;
