import { Box, Typography, Button, List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import Tour from "../models/Tours";
import { API } from "../constant";
import './AcceptBookingPopup.css';
import { BEARER } from "../constant";

interface Props {
    onClose: () => void;
    data: Tour;
}

function AcceptBookingPopup(props: Props) {
    const [bookingroom, setbookingroom] = useState('กรุณาเลือกห้องพัก');
    const [PKGprice, setPKGprice] = useState(0);
    const [selectRoom, setselectRoom] = useState(false);
    const { data, onClose } = props;

    const handleSelectClick = () => {
        setselectRoom(!selectRoom);
    };

    const handleBooking = async () => {}

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10,
            }}>
            <div className='popup-overlay' onClick={onClose} />
            <div className='popup-container'>
                <Box>
                    <Typography variant="h3" textAlign={'center'}>
                        {`ต้องการจองทัวร์`}
                    </Typography>
                    <Typography variant="h3" textAlign={'center'}>
                        {`" ${data.attributes.tour_name} "`}
                    </Typography>
                    <Typography variant="h3" textAlign={'center'}>
                        ราคา
                    </Typography>
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: '28%',
                            width: '75%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            onClick={handleBooking}
                            sx={{
                                backgroundColor: 'rgba(60,185,60,1)',
                                color: 'white',
                                height: '5vh',
                                width: '10vh',
                                fontSize: '3vh'
                            }}>
                            ตกลง
                        </Button>
                        <Box width={'12%'} />
                        <Button
                            onClick={onClose}
                            sx={{
                                backgroundColor: 'rgba(255,0,0,1)',
                                color: 'white',
                                height: '5vh',
                                width: '10vh',
                                fontSize: '3vh'
                            }}>
                            ยกเลิก
                        </Button>
                    </Box>
                </Box>
            </div>
        </Box>
    );
}

export default AcceptBookingPopup;
