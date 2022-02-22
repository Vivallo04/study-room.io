import React from "react";
import List from "@material-ui/core/List";
import {ListItem, ListItemIcon, Divider, Drawer, Box} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";


export default function ToggleBar() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        right: true,
        bottom: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && event.type === "Tab") {
            return;
        }
        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <Box sx={{width: anchor === "left" ? "auto": 250}}
             role = "presentation"
             onClick = {toggleDrawer(anchor, false)}
             onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                {["Inbox", "Starred"].map((text, index) => (
                    <ListItem button key = {text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <HomeIcon/> : <HomeIcon/>}
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </Box>
    );

    return (
        <div>
            {["right"].map((anchor) => (
                <React.Fragment key = {anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
};