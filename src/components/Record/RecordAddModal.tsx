import React from 'react';
import { Button, Input, Modal, Grid, Icon } from 'semantic-ui-react';

interface Props {
  show: boolean;
}
function RecordAddModal({ show }: Props) {
  return (
    <Modal open={show}>
      <Modal.Header closeButton>
        <Modal.Header>
          Add Marker
        </Modal.Header>
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row verticalAlign="middle">
            <Grid.Column width={4}>
            Title
            </Grid.Column>
            <Grid.Column width={12}>
              <Input fluid placeholder="title"/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
            Content
            </Grid.Column>
            <Grid.Column width={12}>
              <Input fluid placeholder="content"/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
            Icon
            </Grid.Column>
            <Grid.Column width={12}>
              <Button.Group>
                <Button icon>
                  <Icon name="home"/>
                </Button>
                <Button icon>
                  <Icon name="pencil alternate"/>
                </Button>
                <Button icon>
                  <Icon name="cut"/>
                </Button>
                <Button icon>
                  <Icon name="heart"/>
                </Button>
                <Button icon>
                  <Icon name="eye"/>
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Modal.Content>
      <Modal.Actions>
        <Button content="ADD" positive />
      </Modal.Actions>
    </Modal>
  );
}

export default RecordAddModal;
