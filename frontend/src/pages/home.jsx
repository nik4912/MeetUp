import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { Button, IconButton, TextField, Typography, Box, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (meetingCode.trim() === "") {
            alert("Please enter a valid meeting code");
            return;
        }
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <Box>
            {/* Navigation Bar */}
            <Box className="navBar" sx={{ display: 'flex', justifyContent: 'space-between', p: 2, boxShadow: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000' }}>
                <h1><span style={{ color: "#FF9839" }}>Meet</span>Up</h1>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate("/history")}>
                        <RestoreIcon sx={{ color: '#1976D2' }} />
                    </IconButton>
                    <Typography>History</Typography>
                    <Button 
                        variant="contained" 
                        color="error" 
                        startIcon={<ExitToAppIcon />} 
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>

            {/* Main Content */}
            <Box className="meetContainer" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', height: '80vh', gap: 4 }}>
                <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Quality Video Calls, Just Like Quality Education
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <TextField fullWidth onChange={e => setMeetingCode(e.target.value)} label="Meeting Code" variant="outlined" />
                        <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                    </Box>
                </Paper>
                <Box>
                    <img srcSet='/logo3.png' alt="Video Call Logo" width="300" height="300" />
                </Box>
            </Box>

            {/* Footer */}
            <Box className="footer" sx={{ textAlign: 'center', p: 2, mt: 4, bgcolor: '#f5f5f5' }}>
                <Typography variant="body2">© 2025 Apna Video Call. All rights reserved.</Typography>
            </Box>
        </Box>
    );
}

export default withAuth(HomeComponent);
