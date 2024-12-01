import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid2,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";

const ExamGradeQuestion = ({ question }) => {

  return (
    <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
      <CardContent>
        {/* Question Title */}
        <Typography variant="h6" gutterBottom>
          {`Question ${question.questionId}`}
        </Typography>

        <Grid2 container alignItems="center" spacing={2} sx={{ mb: 2 }}>
          {/* Score Section */}
          <Grid2 item>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {`${question.score} / ${question.points}`}
            </Typography>
          </Grid2>
          {/* Incorrect Message */}
          <Grid2 item>
            <Typography variant="body2" color="error">
              {question.isCorrect ? "Correct" : "Incorrect"}
            </Typography>
          </Grid2>
        </Grid2>

        {/* Options Section */}
        <Box sx={{ mb: 2 }}>
          {question.options.map((option, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                color: option.isCorrect
                  ? "green"
                  : option.isSelected
                  ? "red"
                  : "inherit",
              }}
            >
              {/* Icons for Correct/Incorrect */}
              {option.isCorrect ? (
                <FontAwesomeIcon icon={faCheck} sx={{ mr: 1 }} />
              ) : option.isSelected ? (
                <FontAwesomeIcon icon={faCancel} sx={{ mr: 1 }} />
              ) : (
                <Box sx={{ width: "24px", mr: 1 }} /> // Empty space for alignment
              )}
              <Typography>{option.text}</Typography>
            </Box>
          ))}
        </Box>

        {/* Grade Comments Section */}
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Grade Comments:</strong>
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={2}
          placeholder="Enter comments here"
          defaultValue={question.gradeComments}
        />

        {/* Save Button */}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" size="small">
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExamGradeQuestion;
