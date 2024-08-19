import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, editProfile } from "../../redux/slices/userSlice";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet, Link } from "react-router-dom";

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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupIcon from "@mui/icons-material/Group";

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

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.gym.data.find((u) => u._id === id)); // Ensure you're accessing the correct user data
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        email: "",
        password: "",
        username: "",
        description: "",
        favourite: "",
        rate: "",
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                price: user.price || "",
                image: user.image || "",
                email: user.email || "",
                password: user.password || "",
                username: user.username || "",
                description: user.description || "",
                favourite: user.favourite || "",
                rate: user.rate || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = { ...formData };
        if (imageFile) {
            // Handle file upload logic here if needed
            // For example, you could upload the file to a server and update the image URL
            // For now, just append the file to the updated data
            updatedData.image = URL.createObjectURL(imageFile);
        }
        dispatch(editProfile({ id, ...updatedData }))
            .unwrap()
            .then(() => {
                navigate("/admin/admin");
            })
            .catch((error) => {
                console.error("Error updating user:", error);
            });
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
                                    <form onSubmit={handleSubmit}>
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
                                                name="username"
                                                label="Username"
                                                variant="outlined"
                                                value={formData.username}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                            <TextField
                                                name="name"
                                                label="Name"
                                                variant="outlined"
                                                value={formData.name}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                            <TextField
                                                name="price"
                                                label="Price"
                                                variant="outlined"
                                                value={formData.price}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                            <TextField
                                                name="image"
                                                label="Image URL"
                                                variant="outlined"
                                                value={formData.image}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                style={{ width: '100%' }}
                                            />
                                            <TextField
                                                name="email"
                                                label="Email"
                                                variant="outlined"
                                                value={formData.email}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                            <TextField
                                                name="password"
                                                label="Password"
                                                type="password"
                                                variant="outlined"
                                                value={formData.password}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                            <TextField
                                                name="description"
                                                label="Description"
                                                variant="outlined"
                                                value={formData.description}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                            <TextField
                                                name="favourite"
                                                label="Favourite"
                                                variant="outlined"
                                                value={formData.favourite}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                            <TextField
                                                name="rate"
                                                label="Rate"
                                                variant="outlined"
                                                value={formData.rate}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                            <Button type="submit" variant="contained" color="primary">
                                                Update User
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
