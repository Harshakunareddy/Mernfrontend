/*
home page contains :
navbar = done
userWidget = done
MyPostWidget = done
PostsWidget = done
FriendListsWidget = done
*/
import NavBar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListsWidget from "scenes/widgets/FriendListsWidget";
import { Box, IconButton, Typography, useMediaQuery, useTheme,InputBase } from "@mui/material";
import { useSelector } from "react-redux";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FlexBetween from "components/FlexBetween";
import { Search } from "@mui/icons-material";



// import profilePage from "scenes/widgets/profilePage";


const HomePage = ()=>{
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {_id,picturePath} = useSelector((state)=> state.user);
    const user = useSelector((state)=> state.user);
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;


    return(
        <Box>
            
            <NavBar />


                                
            {isNonMobileScreens ? 
                    (
                        <Typography fontSize="2rem" align="center">
                            Hi {user.firstName}.. 😎
                        </Typography> 
                    ):
                    
                    <FlexBetween
                    mt="0.25rem"
                    backgroundColor={neutralLight}
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
    
                    </FlexBetween>
            }
            

            <Box
            width="100%"
            padding="2rem 6%"
            gap="0.5rem"
            justifyContent="space-between"
            display={isNonMobileScreens ? "flex" : "block"}
            >
                {/* <Box flexBasis= { isNonMobileScreens ? "26%" : undefined } >
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box> */}

                <Box >
                    {
                    isNonMobileScreens ? (
                        <UserWidget userId={_id} picturePath={picturePath} />

                    ) : 
                    <Typography fontSize="2rem" align="center">
                        Hi {user.firstName}.. 😎
                    </Typography> 
                    
                    }
                </Box>

            
                <Box flexBasis= { isNonMobileScreens ? "42%" : undefined } 
                    mt = { isNonMobileScreens ? undefined : "2rem" } >

                    

                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>

                { isNonMobileScreens && (

                <Box flexBasis="26%">
                {/* <AdvertWidget /> */}
                {/* <Box m="2rem 0" /> */}
                <FriendListsWidget userId={_id} />
                </Box>
                
                )}
                
            </Box>


        </Box>
    )
};

export default HomePage;