import { toLonLat } from 'ol/proj';
import React from 'react';
import { Button, List } from 'semantic-ui-react';
import { useMainTemplateDispatch } from 'src/template/main/MainProvider';
import { DELETE_RECORD, Record } from 'src/lib/graphql/record';
import styled from 'styled-components';
import { Spacer } from 'src/assets/styles/GlobalStyles';
import { useMutation } from '@apollo/client';

const Icon = styled(List.Icon)`
  width: 32px !important;
  min-width: 40px;
  height: 32px !important;
  padding-right: 8px !important;
  display: flex !important;
  align-items: center;
  flex-direction: row;
`;

const ListContent = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  color: black;
  font-weight: 700;
  font-size: 1.25rem;
`;
const Content = styled.div`
  color: black;
  font-size: 1rem;
`;

interface Props {
  item: Record;
}
function RecordListItem({ item } : Props) {
  const dispatch = useMainTemplateDispatch();
  const [deleteRecord] = useMutation(DELETE_RECORD);

  const handleClick = () => {
    const center = toLonLat(item.coordinate);
    dispatch({
      type : 'SET_CENTER',
      payload : center
    });
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    try {
      const res = await deleteRecord({
        variables : {
          id : item._id
        }
      });
      dispatch({
        type : 'DELETE_DATA',
        payload : item
      });
    } catch(e) {
      console.error(e);
    }
  };
  return (
    <List.Item onClick={handleClick}>
      <ListContent>
        <Icon name={item.iconType} size="large" verticalAlign="middle" />
        <div>
          <Title>
            {item.title}
          </Title>
          <Content>
            {item.content}
          </Content>
        </div>

        <Spacer/>
        <Button circular icon="delete" onClick={handleDelete}/>
      </ListContent>
    </List.Item>
  );
}

export default RecordListItem;
