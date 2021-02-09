import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
// eslint-disable-next-line import/named
import { Button, Input, Modal, Grid, Icon, SemanticICONS } from 'semantic-ui-react';
import { CreateRecordResponse, CREATE_RECORD, Record } from 'src/lib/graphql/record';
import useInputs from 'src/lib/hooks/useInputs';
import { useMainTemplateDispatch } from 'src/template/main/MainProvider';

interface Props {
  show: boolean;
}
function RecordAddModal({ show }: Props) {
  const dispatch = useMainTemplateDispatch();
  const [form, onChange] = useInputs({
    title : '',
    content : ''
  });
  const [iconType, setIcon] = useState<SemanticICONS>('home');
  const [createRecord] = useMutation<CreateRecordResponse>(CREATE_RECORD);
  const handleAdd = async () => {
    try {
      const res = await createRecord({
        variables : {
          date : '2021-02-05',
          title : form.title,
          content : form.content,
          iconType : iconType,
          coordinate : [123124, 123124],
          userId : 1
        }
      });
      const createRecordData = res.data?.createRecord;
      if (!createRecordData) throw Error('Create Record Error');
      dispatch({
        type : 'ADD_DATA',
        payload : {
          ...createRecordData
        } as Record
      });
    } catch(e) {
      console.error(e);
    }
  };
  
  const iconList : SemanticICONS[] = [
    'home', 'cut', 'pencil alternate', 'heart', 'eye'
  ];

  const handleClickSetIcon = (icon: SemanticICONS) => {
    setIcon(icon);
  };
  
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
              <Input onChange={onChange} name="title" fluid placeholder="title"/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
            Content
            </Grid.Column>
            <Grid.Column width={12}>
              <Input onChange={onChange} name="content" fluid placeholder="content"/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
            Icon
            </Grid.Column>
            <Grid.Column width={12}>
              <Button.Group>
                {iconList.map(icon => (<Button key={icon} active={icon === iconType} icon onClick={() => handleClickSetIcon(icon)}><Icon name={icon}></Icon></Button>))}
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Modal.Content>
      <Modal.Actions>
        <Button content="ADD" positive onClick={handleAdd}/>
      </Modal.Actions>
    </Modal>
  );
}

export default RecordAddModal;
