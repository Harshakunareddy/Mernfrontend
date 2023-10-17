import Comment from "components/Comment";


import {
    ChatBubbleOutlineOutlined,
    FavoriteOutlined,
    FavoriteBorderOutlined,
    ShareOutlined,
    // SendIcon,
} from "@mui/icons-material";
// import SendIcon from "@mui/icons-material/Send";
// import { Formik } from "formik";

import {
    Box, Divider,Button, IconButton, Typography, useTheme,InputBase
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import FriendOwn from "components/FriendOwn";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    // comments,

})=>{
    const [comment,setComment] = useState();
    const [isComments,setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.token);

    // user id grabbing from the user
    const loggedInUserId = useSelector((state)=> state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const {palette} = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    // patching the database  
    const patchLike = async ()=>{
        const response = await fetch(`https://backend-j9oc.onrender.com/posts/${postId}/like`,{
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            // they are the props only or
            // arguments or the parameters that we give inside the Widget name 
            // that in the another component like MyPostsWidget. 
            
            body: JSON.stringify({userId: loggedInUserId})
        });
        const updatedPost = await response.json();
        dispatch(setPost({post: updatedPost}));
    }

    // const commentAdding = async ()=> {

    // } 
    
    let ownPost = loggedInUserId === postUserId ;



    // comment fetching
    const handleComment = async ()=> {
        // used when passing images
        // const formData = new FormData();

        // adding the userId = _id likewise others
        // formData.append("userId",_id);
        // formData.append("comments",comment);

        // if image also posting then
        // if(image){
            // formData.append("picture",image);
            // formData.append("picturePath",image.name);
        // }
        const response = await fetch(`https://backend-j9oc.onrender.com/posts/${postId}/comment`,{
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: comment,
        });
        const posts = await response.json();
        dispatch(setPost({ post: posts }));
        // setImage(null);
        setComment("");
    };
    
        return(
            <WidgetWrapper m="2rem 0">

                {ownPost && (
                    <>
                                    <FriendOwn
                                    friendId={postUserId} name={name} subtitle={location}
                                    userPicturePath={userPicturePath}
                                    >
                                    </FriendOwn>
                                    <Typography color={main} sx={{mt: "1rem"}}>
                                        {description}
                                    </Typography>
                    
                                    {picturePath && (
                                        <img width="100%" height="auto" alt="post" style={{
                                            borderRadius: "0.75rem", marginTop: "0.75rem"
                    
                                            }}
                                            src={`https://backend-j9oc.onrender.com/assets/${picturePath}`}
                                            
                                        />
                                    )}
                                    <FlexBetween mt="0.25rem">
                                    <FlexBetween gap="1rem">
                                        <FlexBetween gap="0.3rem">
                                            <IconButton onClick={patchLike}>
                                                {isLiked ? (
                                                    <FavoriteOutlined sx={{color: primary}} />
                                                ): (<FavoriteBorderOutlined />)}
                                            </IconButton>
                                            <Typography>
                                                {likeCount}
                                            </Typography>
                                        </FlexBetween>
                    
                                        <FlexBetween gap="0.3rem">
                                            {/* <IconButton onClick={()=>setIsComments(!isComments)}> */}
                                            <IconButton>
                                                <ChatBubbleOutlineOutlined />
                                            </IconButton>
                                            {/* <Typography >
                                                {comments.length}
                                            </Typography> */}
                                        </FlexBetween>
                    
                                        
                                    </FlexBetween>
                    
                                    <IconButton>
                                        <ShareOutlined />
                                    </IconButton>
                                </FlexBetween>
                    
                                {isComments && (
                                    <Box
                                        mt="0.5rem"
                                    >

                                        
                                        {/* input box for adding a comment 
                                         <FlexBetween gap="0.25rem">
                                        
                                        <InputBase
                                                placeholder="Comment....."
                                                onChange={(e)=>setComment(e.target.value)}
                                                value={comment}
                                                sx={{
                                                    width: "100%",
                                                    backgroundColor: palette.neutral.light,
                                                    borderRadius: "2rem",
                                                    padding: "1rem 2rem"
                                                }}
                                                >
                                                
                                            </InputBase>

                                            <Button
                                                disabled={!comment}
                                                onClick={handleComment}
                                                sx={{
                                                    color: "#999",
                                                    // color: palette.background.alt,
                                                    // background baga over color vundi.
                                                    // backgroundColor: palette.primary.main,
                                                    borderRadius: "3rem",
                                                }}
                                                
                                                >
                                                    send
                                            </Button>
                                        
                                        </FlexBetween> 

                                        {comments.map((comment,i)=>(
                                            <Box key={`${name}-${i}`}>
                                                <Divider />
                                                <Typography sx={{color:"yellow"}}>
                                                    {comment}
                                                </Typography>
                                            </Box>
                                        ))}

                                    */}


                                    <Comment postId={postId} />

                                    <Divider />
                                    </Box>
                                )}                                
                    
                    </>
)} 

{/* if friends or even anyother person post */}

                       <Friend
                        friendId={postUserId} name={name} subtitle={location}
                        userPicturePath={userPicturePath}
                        >
                        </Friend>
                        <Typography color={main} sx={{mt: "1rem"}}>
                            {description}
                        </Typography>

                        {picturePath && (
                            <img width="100%" height="auto" alt="post" style={{
                                borderRadius: "0.75rem", marginTop: "0.75rem"

                                }}
                                src={`https://backend-j9oc.onrender.com/assets/${picturePath}`}
                                
                            />
                        )}
                        <FlexBetween mt="0.25rem">
                        <FlexBetween gap="1rem">
                            <FlexBetween gap="0.3rem">
                                <IconButton onClick={patchLike}>
                                    {isLiked ? (
                                        <FavoriteOutlined sx={{color: primary}} />
                                    ): (<FavoriteBorderOutlined />)}
                                </IconButton>
                                <Typography>
                                    {likeCount}
                                </Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.3rem">
                                {/* <IconButton onClick={()=>setIsComments(!isComments)}> */}
                                <IconButton>
                                    <ChatBubbleOutlineOutlined />
                                </IconButton>
                                {/* <Typography >
                                    {comments.length}
                                </Typography> */}
                            </FlexBetween>

                            
                        </FlexBetween>

                        <IconButton>
                            <ShareOutlined />
                        </IconButton>
                    </FlexBetween>


{/* if isComments becomes true in the useState then show the comments */}
                    {isComments && (
                        <Box
                            mt="0.5rem"
                        >

                            {/* input box for adding a comment 
                            <FlexBetween gap="0.25rem">
                                <InputBase
                                placeholder="Comment....."
                                onChange={(e)=>setComment(e.target.value)}
                                value={comment}
                                sx={{
                                    width: "100%",
                                    backgroundColor: palette.neutral.light,
                                    borderRadius: "2rem",
                                    padding: "1rem 2rem"
                                }}
                                >
                                
                            </InputBase>

                            <Button
                                disabled={!comment}
                                onClick={handleComment}
                                sx={{
                                    color: "#999",
                                    // color: palette.background.alt,
                                    // background baga over color vundi.
                                    // backgroundColor: palette.primary.main,
                                    borderRadius: "3rem",
                                }}
                                
                                >
                                    send
                            </Button>
                        

                            </FlexBetween>

                                {comments.map((comment,i)=>(
                                <Box key={`${name}-${i}`}>
                                    <Divider />
                                    <Typography sx={{color:"yellow"}}>
                                        {comment}
                                    </Typography>
                                </Box>
                            ))}
                                */}
                                <Comment postId={postId} />

                        <Divider />
                        </Box>
                    )}                                
    
                


                
            </WidgetWrapper>
        )
    }


export default PostWidget;