import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import {Typography} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding:`${theme.spacing(4)}px ${theme.spacing(3.5)}px
    ${theme.spacing(3)}px`,
        color: theme.palette.openTitle
    },
    paragraphs: {
        font: "Nunito-Regular"
    },
    media: {
        minHeight: 400
    }
}));

export default function Home() {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                Home Page
            </Typography>
            <CardContent>
                <Typography className={classes.paragraphs}>
                    Welcome to studyroom.io
                </Typography>
            </CardContent>
        </Card>
    );
};
