import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet, Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupIcon from "@mui/icons-material/Group";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllUsers } from "../../redux/slices/userSlice";

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

export default function Dashboard() {
    const { data: users, loading, error } = useSelector((state) => state.gym);
    const dispatch = useDispatch();
    const [searchh, setSearchh] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const filteredUsers = (users || []).filter((item) =>
        item?.username?.toLowerCase().includes(searchh.toLowerCase())
    );

    const handleDelete = async (id) => {
        const previousUsers = [...users];
        const updatedUsers = users.filter(user => user._id !== id);
        dispatch({ type: 'SET_USERS', payload: updatedUsers });

        try {
            await dispatch(deleteUsers(id)).unwrap();
            dispatch(getAllUsers());
        } catch (error) {
            console.error("Error deleting user:", error);
            dispatch({ type: 'SET_USERS', payload: previousUsers });
        }
    };

    useEffect(() => {
        console.log("Users data:", users);
        console.log("Filtered users:", filteredUsers);
    }, [users, searchh]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ backgroundColor: "white", boxShadow: 0 }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpen(!open)}
                            sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="black" noWrap sx={{ flexGrow: 1 }}>
                            Admin Panel
                        </Typography>
                        <div style={{ display: "flex" }}>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchh}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setSearchh(inputValue);
                                    setShowResults(!!inputValue);
                                }}
                                style={{
                                    border: "none",
                                    backgroundColor: "#F3F4F8",
                                    borderTopLeftRadius: "5px",
                                    borderBottomLeftRadius: "5px",
                                    color: "black",
                                    height: "30px",
                                    paddingLeft: "12px",
                                }}
                            />
                            <SearchIcon
                                sx={{
                                    backgroundColor: "#134074",
                                    borderTopRightRadius: "5px",
                                    borderBottomRightRadius: "5px",
                                    height: "30px",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                top: "40px",
                                right: "0",
                                width: "20%",
                                background: "white",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                color: "black",
                                marginTop: "20px",
                                display: showResults ? "block" : "none",
                            }}
                        >
                            <ul>
                                {filteredUsers.map((result, index) => (
                                    <li key={index}
                                        style={{
                                            listStyleType: "none",
                                            padding: "3px",
                                            color: "black",
                                            display: "flex",
                                            gap: "10px",
                                        }}
                                    >
                                        <SearchIcon />
                                        <Link
                                            to={`/${result.id}`}
                                            style={{ color: "black", textDecoration: "none" }}
                                        >
                                            {result.username}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                            <MenuIcon />
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
                                    to="/admin/adminUsers"
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
                                    to="/admin/adminNot"
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
                        backgroundColor: "#eaf4f4",
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper elevation={3} style={{ padding: "16px" }}>
                                    <TableContainer component={Paper} style={{ height: "100vh" }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#id</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>Image</TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell>Password</TableCell>
                                                    <TableCell>Username</TableCell>
                                                    <TableCell>Description</TableCell>
                                                    <TableCell>Favourite</TableCell>
                                                    <TableCell>Rate</TableCell>
                                                    <TableCell>Edit</TableCell>

                                                    <TableCell>Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {users && users.map((user) => (
                                                    <TableRow key={user._id}>
                                                        <TableCell>{user._id}</TableCell>
                                                        <TableCell>
                                                            <Link
                                                                to={`/${user._id}`}
                                                                style={{ color: "black", textDecoration: "none" }}
                                                            >
                                                                {user.name}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>{user.price}</TableCell>
                                                        <TableCell>
                                                            <img
                                                                src={user.image}
                                                                alt={user.name}
                                                                style={{ width: "100px", height: "auto", objectFit: "cover" }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>{user.email}</TableCell>
                                                        <TableCell>{user.password}</TableCell>
                                                        <TableCell>{user.username}</TableCell>
                                                        <TableCell>{user.description}</TableCell>
                                                        <TableCell>{user.favourite}</TableCell>
                                                        <TableCell>{user.rate}</TableCell>
                                                        <TableCell><Link to={`/admin/edit/${user._id}`} style={{
                                                            color: "black",
                                                            border: "none",
                                                            padding: "10px",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                            backgroundColor: "yellow",
                                                            textDecoration: "none",

                                                        }}>
                                                            <b>Edit</b>
                                                        </Link></TableCell>


                                                        <TableCell>
                                                            <button
                                                                style={{
                                                                    color: "white",
                                                                    border: "none",
                                                                    padding: "10px",
                                                                    borderRadius: "5px",
                                                                    cursor: "pointer",
                                                                    backgroundColor: "#9A031E",
                                                                }}
                                                                onClick={() => handleDelete(user._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
