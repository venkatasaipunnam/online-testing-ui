
import React from 'react';
import Navbar from './components/Navbar';
import ExamTable from './components/ExamTable';
import { Container, Typography, Button, Stack } from '@mui/material';
import './HomeContainer.css'

const HomeContainer = () => {

    return (
        <div>
            <Navbar />
            <Container style={{ marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome, Jackie
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    What would you like to do?
                </Typography>
                <Stack direction="row" spacing={2} style={{ marginBottom: '20px' }}>
                    <Button variant="contained" color="primary">Take Exam</Button>
                    <Button variant="outlined">Create Exam</Button>
                    <Button variant="outlined">View Exam</Button>
                    <Button variant="outlined">Grade Exam</Button>
                    <Button variant="outlined">Analyze Exam</Button>
                </Stack>
                <Typography variant="h5" gutterBottom>
                    Your Upcoming Exams
                </Typography>
                <ExamTable />
            </Container>
        </div>
    );
}

export default HomeContainer;