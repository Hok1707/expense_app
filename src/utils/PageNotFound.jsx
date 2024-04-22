import { motion } from 'framer-motion';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h2" gutterBottom>
                    404 - Not Found
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                    Oops! The page you are looking for doesnt exist.
                </Typography>
                <Button variant="contained" component={Link} to="/transaction/user" color="primary">
                    Go to Home
                </Button>
            </motion.div>
        </Container>
    );
};

export default NotFoundPage;
