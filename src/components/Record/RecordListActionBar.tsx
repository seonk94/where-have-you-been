import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Spacer } from 'src/assets/styles/GlobalStyles';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding-bottom: 24px;
`;

function RecordListActionBar() {
  return (
    <Wrapper>
      <Button>
        추가
      </Button>
      <Spacer/>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          필터
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>최신순</Dropdown.Item>
          <Dropdown.Item>생성일 순</Dropdown.Item>
          <Dropdown.Item>이름순</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Wrapper>
  );
}

export default RecordListActionBar;
