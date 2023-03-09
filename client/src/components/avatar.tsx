import { Box, Typography, TextField, Button, Grid, Rating, CardMedia } from '@mui/material';
import UserData from "../models/User";
import Repo from '../repositories';
import { useEffect, useState } from 'react';
import { Console } from 'console';



interface Item {
    ID: number;
}

function Avatar(props: Item) {
    const [avatar, setAvatar] = useState<UserData>()

    const userID = props.ID.toString()
    const fetchAvatar = async () => {
        const result = await Repo.UserRepo.get(userID);
        if (result) {
            setAvatar(result)
        }
    }
    const img = (avatar?.Avatar !== null) ? `http://localhost:1338${avatar?.Avatar.url}` : `http://localhost:1338/uploads/3135715_21e2a57770.png?updated_at=2023-03-08T23:12:05.848Z`;
    useEffect(() => {
        fetchAvatar();
    }, []);
    return (
        <Box sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            marginBottom: 'auto',
            marginTop: 'auto',
        }}>
            <CardMedia
                component="img"
                alt={img}
                height="300"
                image={img}

                sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                }}
            />
        </Box>
    )
}

export default Avatar