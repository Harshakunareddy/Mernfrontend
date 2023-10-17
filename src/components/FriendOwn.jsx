import {PersonAddOutlined,PersonRemoveOutlined} from "@mui/icons-material";


import { Box, IconButton, Typography,useTheme } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import state, { setFriends } from "state";
import FlexBetween from "./FlexBetween";


import UserImage from "./UserImage";

// here we need to create a component for friend box 
// here the arguments are the things that are present on the database
// accessed using the props or simply props.


const FriendOwn = ( { friendId, name, subtitle, userPicturePath } )=>{
    const dispatch = useDispatch();

    // useNavigate = to handle navigation within a single page application
    //               it allows you to programatically navigate 
    //               to different routes without a fullpage reload
    const navigate = useNavigate();

    // useSelector = to access the state from the 
    //               redux store within your component.
    // after giving this component inside our application at
    //  anyplace then we get the state from the redux store
    // and our application would run.

    // _id  == user id bro
    const {_id} = useSelector((state)=> state.user);
    
    const token = useSelector((state)=> state.token);
    const friends = useSelector((state)=> state.user.friends);

    // here we get the theme.js data in the palette variable which is stored in the {dictionary} manner.
    const {palette} = useTheme();

    // retrieving some items from the theme.js file
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium; 


    // checking that friend or not using t/f
    const isFriend = friends.find((friend)=> friend._id === friendId);
    
    
    // retrieving the friend
    // const patchFriend = async ()=> {}



    // here we dont need the patchFriend
    // because here own posts are watching.

    const patchFriend = async ()=> {
        const response = await fetch(
            // came from backend 
            // that have the user's friend's id's that means that url is 
            // having the friends list in the mongodb database.
            `http://localhost:3001/users/${_id}/${friendId}`
        ,

        {
            
            // same method PATCH as the user.js in the router folder
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },

        }

        ); // fetch ends

        const data = await response.json();
        
        // here setFriends came from the index.js file in state folder
        // where setFriends is one of the reducer that is having the state.friend payload

        dispatch(setFriends({friends: data}));


    } //patchFriend ends

    return (
        <FlexBetween>
            <FlexBetween gap="1rem" >
                {/* 
                
                    

                    userPicturePath came from the backend database 
                    that is retrived from the user who is the friend of the current auth user
                    
                    in which process:
                    
                    front end lo vunna user id ni teeskoni 
                    => state lo payload cheskoni =
                     not known process to get payload may be that will be came from the scenes/Pages , widgets let's see

                    => aa payload will travel to and fro to send data

                    => db lo friends ni teeskoni using fetch

                    => using the state of setFriends we need to dispatch res.json

                    => andulo manaku every thing will be accessible



                */}
                {/* userPicturePath is just a prop man that came from database */}
                <UserImage image={userPicturePath} size="55px">

                </UserImage>
                <Box
                    onClick={
                        ()=>{ 
                                navigate(`/profile/${friendId}`);
                                // url does update but the components do not rerender so
                                // just refresh the page
                                // not a good solution we need to do a long workaround solution  for 
                                navigate(0);
                            }
                    }
                >
                    <Typography
                        color= {main}
                        variant = "h5"
                        fontWeight = "500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}

                    >
                        {name}
                    </Typography>
                    <Typography 
                        color={medium}
                        fontSize="0.75rem"
                    >
                        {subtitle}
                    </Typography>

                </Box>

            </FlexBetween>


            {/* <IconButton onClick={()=> patchFriend()}
            sx={{backgroundColor: primaryLight, p:"0.6rem"}}
            >
                    {isFriend ?
                     (<PersonRemoveOutlined sx={{color:primaryDark}}/>)
                      :
                     (<PersonAddOutlined sx={{color: primaryLight}} />)
                    }
            </IconButton> */}

            
        </FlexBetween>
    )

};



export default FriendOwn;