import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Divider,
} from '@mui/material';

const TrackingShipment = ({ open, onClose, trackingData }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Shipment Tracking Updates</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              {Object.entries(trackingData).map(([date, updates]) => (
                <React.Fragment key={date}>
                  {updates.map((update, index) => (
                    <TableRow key={`${date}-${index}`}>
                      {index === 0 && (
                        <TableCell rowSpan={updates.length}>{date}</TableCell>
                      )}
                      <TableCell>{update.time}</TableCell>
                      <TableCell>
                        <div style={{ fontWeight: '600' }}>{update.action}</div>
                        <div>{update.place}</div>
                      </TableCell>
                      {index !== updates.length - 1 && (
                        <TableCell align="center">
                          <Divider orientation="vertical" flexItem />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default TrackingShipment;
