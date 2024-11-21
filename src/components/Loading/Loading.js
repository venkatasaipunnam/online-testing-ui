import { CircularProgress, Container } from '@mui/material';


export const LoadingPage = () => (
    <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress style={{color:'red'}} />
        </div>
    </Container>
  );