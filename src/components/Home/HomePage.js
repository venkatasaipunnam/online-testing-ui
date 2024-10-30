import React from 'react';
import { Container, Typography, Button, Card, CardContent, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import instructorImage from '../../assets/instructor.jpg'; // Update the path as needed
import studentImage from '../../assets/student.jpg'; // Update the path as needed
import resultIcon from '../../assets/results-icon.jpg'; // Icon for results
import evaluateIcon from '../../assets/exam-grade-icon.jpg'; // Icon for evaluation

const HomePage = () => {
    const userState = useSelector((state) => state.user.value);
    const isInstructor = userState?.user?.userType === 'STUDENT'; // Check if user is an instructor

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Welcome to the Online Testing Application!
            </Typography>
            <Typography variant="h5" gutterBottom>
                {isInstructor 
                    ? "Manage your tests efficiently and monitor student progress." 
                    : "Prepare for your tests and track your learning journey."}
            </Typography>
            <Box 
                display="flex" 
                flexDirection={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                marginTop={2} 
                gap={3}
            >
                {/* Test Card */}
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <img 
                            src={isInstructor ? instructorImage : studentImage} 
                            alt={isInstructor ? "Instructor" : "Student"} 
                            style={{ width: '20%', height: 'auto', borderRadius: '4px' }} 
                        />
                        <Typography variant="h5" marginTop={2}>
                            {isInstructor ? "Create a Test" : "Take a Test"}
                        </Typography>
                        <Typography variant="body2" paragraph>
                            {isInstructor 
                                ? "Instructors can create customized tests for their students." 
                                : "Students can explore available tests and enhance their knowledge."}
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            component={Link} 
                            to={isInstructor ? "/create-test" : "/test-list"}
                            sx={{ marginTop: 2 }}
                        >
                            {isInstructor ? "Go to Create Test" : "View Available Tests"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Evaluation Card for Instructors */}
                {isInstructor && (
                    <Card sx={{ flex: 1 }}>
                        <CardContent>
                            <img 
                                src={evaluateIcon} 
                                alt="Evaluate Icon" 
                                style={{ width: '40px', marginTop: '10px' }} 
                            />
                            <Typography variant="h5" marginTop={2}>
                                Evaluate Tests
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Review and provide grades for student tests efficiently.
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                component={Link} 
                                to="/evaluate-tests"
                                sx={{ marginTop: 2 }}
                            >
                                Start Evaluating
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Results Card */}
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <img 
                            src={resultIcon} 
                            alt="Result Icon" 
                            style={{ width: '40px', marginTop: '10px' }} 
                        />
                        <Typography variant="h5" marginTop={2}>
                            {isInstructor ? "Monitor Results" : "Check Your Results"}
                        </Typography>
                        <Typography variant="body2" paragraph>
                            {isInstructor 
                                ? "Review student performance and provide feedback." 
                                : "View your test scores and feedback after completion."}
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            component={Link} 
                            to="/results"
                            sx={{ marginTop: 2 }}
                        >
                            {isInstructor ? "View Student Results" : "See Your Results"}
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default HomePage;