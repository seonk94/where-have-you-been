import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import { Record } from 'src/lib/graphql/record';
import styled from 'styled-components';

interface Props {
  record: Record;
  isFirst?: boolean;
}


const Container = styled.div<{ isFirst : boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid ${props => props.isFirst ? '#e6e6e6' : '#fff'};
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
  white-space: pre-line;
`;


function RecordCardNonBoard({ record, isFirst = false } : Props) {
  return (
    <Container isFirst={isFirst}>
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
        <Typography variant="body1" component="p">
          {record.content}
        </Typography>
      </Content>
    </Container>
  );
}

export default React.memo(RecordCardNonBoard);
