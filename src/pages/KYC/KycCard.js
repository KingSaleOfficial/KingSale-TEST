import { Typography, Box } from '@material-ui/core';
import React from 'react';
import moment from 'moment';

export default function KycCard({ data, index }) {
  return (
    <Box
      style={
        index % 2 === 0
          ? {
              backgroundColor: '#d5ecf5',
              borderRadius: 10,
              padding: 20,
              minHeight: 95,
            }
          : {
              backgroundColor: '#f5d5da',
              borderRadius: 10,
              padding: 20,
              minHeight: 95,
            }
      }
    >
      <Box>
        <Typography variant="body2" className="extra-bold">
          Document Name : {data.docName}
        </Typography>
        <Typography variant="subtitle2">
          Status : {data.documentStatus}
        </Typography>
        {data.status === 'Rejected' && (
          <Typography variant="subtitle2">
            Rejected Reason : {data.reason}
          </Typography>
        )}
        <Box>
          <Typography variant="subtitle2">
            Document Number : {data.docIdNumber}
          </Typography>
          <Typography
            variant="caption"
            paragraph
            style={{ textAlign: 'right', marginBottom: '0' }}
          >
            {moment(data.updateTime).format('DD MMM, YYYY')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
