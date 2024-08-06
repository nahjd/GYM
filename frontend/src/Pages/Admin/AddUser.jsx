import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet, Link } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupIcon from "@mui/icons-material/Group";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        backgroundColor: "white",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const defaultTheme = createTheme();

export default function AddUser() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const [username, setUsername] = React.useState("");
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [image, setImage] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleAddUser = (e) => {
        e.preventDefault();
        const userObj = {
            username: username,
            name: name,
            price: price,
            image: image,
            email: email,
            password: password,
        };

        dispatch(addUser(userObj));
        setUsername("");
        setName("");
        setPrice("");
        setImage("");
        setEmail("");
        setPassword("");
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar open={open} sx={{ backgroundColor: "white", boxShadow: 0 }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpen(!open)}
                            sx={{
                                marginRight: "36px",
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="primary"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Panel
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={() => setOpen(!open)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <ListItem>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    backgroundColor: "#134074",
                                    borderRadius: "7px",
                                    width: "100%",
                                    paddingLeft: "10px",
                                }}
                            >
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        display: "flex",
                                    }}
                                    to="/admin/admin"
                                >
                                    <GroupIcon style={{ marginRight: "10px" }} />
                                    Users
                                </Link>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    backgroundColor: "#134074",
                                    borderRadius: "7px",
                                    width: "100%",
                                    paddingLeft: "10px",
                                }}
                            >
                                <Link
                                    to="/admin/addUsers"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        display: "flex",
                                    }}
                                >
                                    <PersonAddAlt1Icon style={{ marginRight: "10px" }} />
                                    Add User
                                </Link>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    backgroundColor: "#134074",
                                    borderRadius: "7px",
                                    width: "100%",
                                    paddingLeft: "10px",
                                }}
                            >
                                <Link
                                    to="/notification"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        display: "flex",
                                    }}
                                >
                                    <NotificationsNoneIcon style={{ marginRight: "10px" }} />
                                    Notification
                                </Link>
                            </Typography>
                        </ListItem>
                        <Divider sx={{ my: 1 }} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: "#EAF4F4",
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                    <form onSubmit={handleAddUser}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "20px",
                                                padding: "20px",
                                            }}
                                        >
                                            <TextField
                                                label="Username"
                                                variant="outlined"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Name"
                                                variant="outlined"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Price"
                                                variant="outlined"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Image URL"
                                                variant="outlined"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Email"
                                                variant="outlined"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Password"
                                                variant="outlined"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                fullWidth
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                            >
                                                Add User
                                            </Button>
                                        </div>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
