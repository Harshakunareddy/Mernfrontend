import {
    Box,Button,TextField,useMediaQuery,Typography,useTheme
} from "@mui/material";
import { useState } from "react"
import { EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import {setLogin} from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    // creating the objects for yup as a blueprint to follow
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = ()=>{
    const [pageType,setPageType] = useState("login");
    

    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    // from database to and fro
    const register = async (values, onSubmitProps)=>{
        // Provides a way to easily construct a set of key/value pairs 
        // representing form fields and their values,
        //  which can then be easily sent using the XMLHttpRequest.send() method. 
        
        
        
        // the input values that we give on the frontend will be stored in the formData 
        // as the values in the form of key-valued Pairs.

        // and this values can be used in register to send to backend.
        // as follows the code.
        const formData = new FormData();
        for (let value in values){
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        const savedUserResponse = await fetch("http://localhost:3001/auth/register",{
            method: "POST",
            body: formData,
        });
        const savedUser = await savedUserResponse.json();

        // after submitting the code it will resets the form.
        onSubmitProps.resetForm();

        // if user valid then login pageType will be set.
        if(savedUser){
            setPageType("login");
        }

    }
    
    // sending the username and password to backend 
    // then there will be code available to check that the user is valid or not
    // and it sends the json formatted code as a response.
    const login = async (values, onSubmitProps)=>{
        const loggedInResponse = await fetch("http://localhost:3001/auth/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            // stringfy : converts js values to json
            body: JSON.stringify(values),
        });
        
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if(loggedIn){
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home")
        }
    }

    // handle Form code
    const handleFormSubmit = async (values,onSubmitProps)=>{
        if(isLogin){
            await login(values, onSubmitProps);
        }
        if(isRegister){
            await register(values, onSubmitProps);
        }
    };
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={ isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >

        {/* { this indicates the code inside of this is js } 
                and ({})=>{} indicates the arrow function  
        */}
            {/* { ({})=>{} } */}
            { ({values,errors,touched,handleBlur,handleChange,handleSubmit,setFieldValue,resetForm})=>(
                <form onSubmit={handleSubmit}>
                    <Box display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4"
                        }
                    }}
                    >
                        {isRegister && (
                            <>
                            {/* First name input field */}

                                <TextField 
                                    label="First Name"
                                    onBlur = {handleBlur}
                                    onChange = {handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText = {touched.firstName && errors.firstName}
                                    sx={{gridColumn: "span 2"}}
                                ></TextField>

                            {/* last name input field */}
                                <TextField 
                                    label="Last Name"
                                    onBlur = {handleBlur}
                                    onChange = {handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText = {touched.lastName && errors.lastName}
                                    sx={{gridColumn: "span 2"}}
                                ></TextField>

                            {/* location input field */}
                            <TextField 
                                    label="Location"
                                    onBlur = {handleBlur}
                                    onChange = {handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText = {touched.location && errors.location}
                                    sx={{gridColumn: "span 2"}}
                                ></TextField>

                            {/* occupation input field  */}
                            <TextField 
                                    label="Occupation"
                                    onBlur = {handleBlur}
                                    onChange = {handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText = {touched.occupation && errors.occupation}
                                    sx={{gridColumn: "span 2"}}
                                ></TextField>

                            {/* profile photo dropzone */}
                            <Box 
                            gridColumn="span 4"
                            border="1px solid palette.neutral.medium"
                            borderRadius="5px"
                            p="1rem"
                            >
                                <Dropzone 
                                acceptedFiles = ".jpg,.jpeg,.png"
                                multiple = {false}
                                onDrop={(acceptedFiles)=> setFieldValue("picture",acceptedFiles[0])}
                                >

                                    {/* getRootProps = deals with the outermost layer of dropzone which contains the obj containing props 
                                                       which can handles events like dragging files over the drop zone and dropping into it.
                                    */}

                                    {/* getInputProps = this f'n returns an object containing props that should be spread onto an <input /> element */}


                                    {({getRootProps, getInputProps}) => (
                                        <Box
                                         {...getRootProps()}
                                        //  border="2px dashed palette.primary.main"
                                         border={ `2px dashed ${palette.primary.main }`}
                                         p="1rem"
                                         sx={{
                                            "&:hover":{
                                                cursor: "pointer"
                                            }
                                         }}
                                        
                                        >

                                            <input {...getInputProps()} />
                                            {!values.picture ? (<p>Add Picture</p>) : (
                                                <FlexBetween>
                                                    <Typography>
                                                        {values.picture.name}
                                                    </Typography>
                                                    <EditOutlined />
                                                </FlexBetween>
                                            )  }

                                        </Box>
                                    )}

                                </Dropzone>

                            </Box>

                            
                            </>
                        )}


                        {/* login elements */}
                        {/* email input field  */}
                        <TextField 
                                    label="Email"
                                    onBlur = {handleBlur}
                                    onChange = {handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText = {touched.email && errors.email}
                                    sx={{gridColumn: "span 4"}}
                                ></TextField>

                        {/* password input field  */}
                        <TextField 
                                    label="Password"
                                    onBlur = {handleBlur}
                                    type = "password"
                                    onChange = {handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText = {touched.password && errors.password}
                                    sx={{gridColumn: "span 4"}}
                                ></TextField>
                        
                    </Box>

                    <Box>
                        <Button 
                        fullWidth
                        type="submit"
                        sx={{
                            p: "1rem",
                            m: "2rem 0",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover":{
                                color: palette.primary.main,
                            },
                        }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}

                        </Button>

                        <Typography
                        onClick={()=>{
                            setPageType(isLogin ? "register" : "login");
                            resetForm();
                        }}
                        sx={{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&: hover":{
                                cursor: "pointer",
                                color: palette.primary.light,
                            },
                        }}
                        >
                            {isLogin ? 
                            "Don't have an account ? sign up here." 
                            : 
                            "Already have an account ? Login Here"
                            }
                        </Typography>

                    </Box>
                </form>
            ) }

        </Formik>
    )

}


export default Form;