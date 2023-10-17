import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    // Select,
    // MenuItem,
    // FormControl,
    useTheme,
    useMediaQuery,
    } from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setMode,setLogout} from "state";
import FlexBetween from "components/FlexBetween";

// navbar 
const NavBar = ()=>{
    const [isMobileMenuToggled,setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector((state)=>state.user);
    
    // not mobile screens having 1000px size or more are considered as the nonMobileScreens 
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    // const fullName = `${user.firstName} ${user.lastName}`;
    // const fullName = "user-1";

    return (
    
        // styling starts
        // this is for whole navbar box
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        {/* logo and search box */}
{/* logo flex between ends */}
        <FlexBetween gap="1.75rem">
            <Typography fontWeight="bold" fontSize="clamp(1rem,2rem,2.25rem)"
             color="primary"
              onClick={()=>navigate("/home")}
              sx={{
                "&:hover":{
                    color: primaryLight,
                    cursor: "pointer"
                },
              }}
              >
                Social-Media
            </Typography>

            {/* for pc users or for larger screens = isNonMobileScreens*/}
            {isNonMobileScreens && (
                <FlexBetween
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
            )}
        </FlexBetween> 
{/* logo flex between ends */}

        {/* {isNonMobileScreens ? () : () } */}
        {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                <IconButton onClick={()=> dispatch(setMode())}>
                    {
                    theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: "25px"}} />
                    ) : (
                        <LightMode sx={{color:dark, fontSize: "25px"}}/>
                    )
                    }
                </IconButton>
                <Message sx={{ fontSize: "25px" }} />
                <Notifications sx={{fontSize: "25px"}} />
                <Help sx={{fontSize: "25px"}} />

                {/* select toggle  */}
                {/* <FormControl variant="standard" value={fullName}>
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            padding: "0.25rem 1rem",
                            "& .MuiSvgIcon-root" : {
                                pr: "0.25rem",
                                width: "3rem",
                            },
                            "& .MuiSelect-select: focus": {
                                backgroundColor: neutralLight
                            },
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={()=> dispatch(setLogout())}>
                            Log Out
                        </MenuItem>

                    </Select> 
                </FormControl>
                
                */}

                 <Typography
                 onClick = {()=> dispatch(setLogout())}
                 sx={{
                    '&:hover': {
                        color: "#222"
                    }
                 }}
                 >Logout</Typography>
            </FlexBetween>
        ) : (
            <IconButton onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu />
            </IconButton>
        ) }

        {/* if menubutton toggled && !isNonMobileScreens && our code goes */}
        {/* that means it's a mobile screen */}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
            position="fixed"
            right= "0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}

            >
                {/* close icon placing at the end of that space using flex-end property */}
                <Box
                display="flex" 
                justifyContent="flex-end"
                p="1rem"

                >
                    <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Close />
                    </IconButton>

                </Box>
                {/* close symbol code ends  */}

                {/* code for navbar elements column-wise aligning */}
                <FlexBetween
                 display="flex"
                 flexDirection="column"
                 justifyContent="center"
                 alignItems="center"
                 gap="3rem"

                >
                    
                <IconButton 
                    sx={{fontSize: "25px"}} 
                    onClick={()=> dispatch(setMode())}>
                    {
                    theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: "25px"}} />
                    ) : (
                        <LightMode sx={{color:dark, fontSize: "25px"}}/>
                    )
                    }
                </IconButton>
                <Message sx={{ fontSize: "25px" }} />
                <Notifications sx={{fontSize: "25px"}} />
                <Help sx={{fontSize: "25px"}} />

                {/* select toggle  */}
                {/* <FormControl variant="standard" value={fullName}>
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            padding: "0.25rem 1rem",
                            "& .MuiSvgIcon-root" : {
                                pr: "0.25rem",
                                width: "3rem",
                            },
                            "& .MuiSelect-select: focus": {
                                backgroundColor: "neutralLight"
                            },
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={()=> dispatch(setLogout())}>
                            Log Out
                        </MenuItem>

                    </Select>
                </FormControl> */}

                <Typography
                onClick = {()=> dispatch(setLogout())}
                sx={{

                    "&:hover":{
                        color: "#222",
                    }
                }}
                >
                    Logout
                </Typography>
                </FlexBetween>

            </Box>
        )}
    </FlexBetween> 
// main FlexBetween
    ); // return ends

}
export default NavBar;

























