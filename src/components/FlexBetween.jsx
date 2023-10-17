import { Box } from "@mui/material";
import { styled } from "@mui/system";


// Box = wrapper for most of the css utility needs
//       wraps your component and creates a new DOM element = <div>
//       we can change it to span also <Box component="span" />

// styled = we can do styling the components using
/* const StyledButton =  styled(Button)`
                          bgcolor: red;
                             color: blue;
                             border: 1px solid blue;
                              `;
                            or use the below method and export */
                            
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export default FlexBetween;