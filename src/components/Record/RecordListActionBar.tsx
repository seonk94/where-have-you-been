import React from 'react';
import { Button } from 'semantic-ui-react';
import { Spacer } from 'src/assets/styles/GlobalStyles';
import { useMainTemplateDispatch } from 'src/template/main/MainProvider';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;


function RecordListActionBar() {
  const dispatch = useMainTemplateDispatch();

  const handleAddButton = () => {
    dispatch({
      type : 'SET_EDIT_MODE',
      payload : true
    });
  };
  return (
    <Wrapper>
      <Button primary onClick={handleAddButton}>
        추가
      </Button>
      <Spacer/>
    </Wrapper>
  );
}

export default RecordListActionBar;
