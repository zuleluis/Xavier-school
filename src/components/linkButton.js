import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { Box } from "@mui/material";

export default function LinkButton(props){
    return(
        <Box>
            <Button
                variant="contained"
                size={props.size}
                sx={{backgroundColor: props.buttonColor, mr:1}}
                component={Link} to={props.link}
            >
                {props.buttonText}
            </Button>
        </Box>
    );
}