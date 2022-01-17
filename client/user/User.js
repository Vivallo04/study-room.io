import {useEffect, useState} from "react";
import {list} from "./api-user";
import React from 'react';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@material-ui/core";
import {ArrowForward, List, Person} from "@material-ui/icons";
import {Link} from "react-router-dom";

export default function Users() {
  const[users, setUsers] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
    return function cleanUp() {
      abortController.abort();
    }
  }, []);
  return (
    <Paper className = {classes.root} elevation={4}>
    <Typography  variant = "h6" className = {classes.title}>
      All Users
    </Typography>
    <List dense>
      {users.map((item, i) => {
        return <Link to={"/user/" + item.id} key = {i}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <Person/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name}/>
                  <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward/>
                  </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
               </Link>
        })
      }
      </List>
   </Paper>
  )
};
