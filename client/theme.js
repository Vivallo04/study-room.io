import { createTheme} from "@material-ui/core/styles";


const theme = createTheme({
    typography: {
        useNextVariants: true,
        fontFamily: [
            "Coolvetica",
            "Nunito-Regular"
        ]
    },
    palette: {
        primary: {
            light: '#0F8FFF',
            main: '#3E6BFF',
            dark: '#180B5B',
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: '#FFCB77',
            main: '#FFC847',
            dark: '#FE6D73',
            contrastText: '#3e6bff'
        },
        openTitle: '#180b5b',
        type: 'light'
    }
});

export default theme;