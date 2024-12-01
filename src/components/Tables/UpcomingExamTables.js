// src/components/ExamTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const UpcomingExamTable = () => {
  const exams = [
    { name: 'Midterm 1', course: 'Biology', date: 'Oct 15', time: '9:00am - 10:00am', status: 'Upcoming' },
    { name: 'Midterm 2', course: 'Biology', date: 'Oct 20', time: '9:00am - 10:00am', status: 'Upcoming' },
    { name: 'Final', course: 'Biology', date: 'Dec 3', time: '9:00am - 10:00am', status: 'Upcoming' },
    { name: 'Midterm 1', course: 'Chemistry', date: 'Oct 12', time: '1:00pm - 2:00pm', status: 'Completed' },
    { name: 'Final', course: 'Chemistry', date: 'Dec 7', time: '1:00pm - 2:00pm', status: 'Upcoming' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Exam</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exams.map((exam, index) => (
            <TableRow key={index}>
              <TableCell>{exam.name}</TableCell>
              <TableCell style={{ color: 'blue', cursor: 'pointer' }}>{exam.course}</TableCell>
              <TableCell>{exam.date}</TableCell>
              <TableCell>{exam.time}</TableCell>
              <TableCell>
                <Button variant="outlined" disabled={exam.status === 'Completed'}>
                  {exam.status}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingExamTable;
