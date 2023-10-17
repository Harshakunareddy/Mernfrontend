import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    
} from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import{
    Box, Typography, Divider, useTheme
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({userId,picturePath})=>{
    const navigate = useNavigate();
    const token = useSelector((state)=> state.token);
    const {palette} = useTheme();
    const [user,setUser] = useState(null);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;


    // calling the api
    const getUser = async ()=>{

        const response = await fetch(`https://backend-j9oc.onrender.com/users/${userId}`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUser(data);
    };
    useEffect(()=>{
        getUser();
    },[]);

    // if user not present
    if (!user){
        return null;
    }
    // else destructing the variables
    const {
        firstName,lastName,location,occupation,viewedProfile,impressions,friends
    } = user;

    return(
        <WidgetWrapper>
            {/* 1st row having one profile photo and user Name */}
            <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={()=> navigate(`/profile/${userId}`)}
            >
                {/* put photo and name here */}
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography 
                        variant="h4"
                        color={dark}
                        fontWeight="500"
                        sx={{
                            "&:hover":{
                                color: palette.primary.light,
                                cursor: "pointer",
                            }
                        }}

                        >
                            {firstName} {lastName}
                        </Typography>

                        {/* no. of friends */}
                        <Typography
                        color={medium}
                        >
                            {friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />

                
            </FlexBetween>
            {/* first row ends */}
            

            <Divider />

            {/* second row starts */}

            <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large"
                     sx={{color: main}} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                
                <Box display="flex" alignItems="center" gap="1rem" >
                    <WorkOutlineOutlined fontSize="large"
                     sx={{color: main}} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
                
            </Box>

            {/* second row ends */}
                <Divider />
            {/* third row starts */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Profile Views:</Typography>
                    <Typography color={main} fontWeight="500" >{viewedProfile}</Typography>
                </FlexBetween>

                
                <FlexBetween>
                    <Typography color={medium}>Post Impressions:</Typography>
                    <Typography color={main} fontWeight="500">{impressions}</Typography>
                </FlexBetween>
            </Box>
            {/* third row ends */}


            <Divider />


            {/* fourth row starts */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                        Social Profiles
                    </Typography>

                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            {/* <img src="<TwitterIcon />" alt="Tw" /> */}
                            <TwitterIcon />
                            <Box>
                                <Typography color={main} fontWeight="500">Twitter</Typography>
                                <Typography color={medium}>Social Network</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}} />
                    </FlexBetween>

                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                            {/* <img src="" alt="Ln" /> */}
                            <LinkedInIcon />
                            <Box>
                                <Typography color={main} fontWeight="500">Linkedin</Typography>
                                <Typography color={medium}>Network PlatForm</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}} />
                    </FlexBetween>
                </Box>

            {/* fourth row ends */}
        </WidgetWrapper>
    );


};







export default UserWidget;