import styled from 'styled-components';
import React from 'react';
import { Record } from 'src/lib/graphql/record';
import { Typography } from '@material-ui/core';

interface Props {
  record: Record;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const Date = styled.div`
  font-size: 10px;
  font-weight: 400;
  margin-bottom: 4px;
`;
const Content = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

function RecordCard({ record} : Props) {
  return (
    <Container>
      <Title>
        <Typography variant="subtitle1">
          {record.title}
        </Typography>
      </Title>
      <Date>
        <Typography variant="caption">
          {record.date}
        </Typography>
      </Date>
      <Content>
        <Typography variant="body1">
          {record.content}
        </Typography>
      </Content>
    </Container>
  );
}

export default RecordCard;
