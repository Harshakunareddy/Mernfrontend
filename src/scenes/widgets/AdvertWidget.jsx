import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const {palette} = useTheme();
    
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return(
        <WidgetWrapper>
            <FlexBetween>
                <Typography 
                fontWeight="500"
                variant="h5"
                color={dark}    
                >
                    Sponsored
                </Typography>
                <Typography
                >Create Ad</Typography>
            </FlexBetween>
            <img 
            height="auto"
            width="100%"
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            src="abc.jpg" alt="adPhoto" 
             />

            <FlexBetween>
                <Typography
                color={main}
                
                >Tiger Cosmetics</Typography>
                <Typography
                color={medium}
                
                >Tigercosmetics.com</Typography>
            </FlexBetween>

                <Typography
                color={medium}
                m="0.5rem 0"
                >
                    Your Pathway to stunning beauty is this only.
                </Typography>
        </WidgetWrapper>
    )

}
export default AdvertWidget;