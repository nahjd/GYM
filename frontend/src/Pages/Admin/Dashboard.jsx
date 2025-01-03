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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from '@mui/icons-material/Edit';
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
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [open, setOpen] = useState(true);
    const [openImage, setOpenImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [sortBy, setSortBy] = useState("none");
    const [hover, setHover] = useState(false);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const filteredUsers = (users || [])
        .filter((item) => item?.name?.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "priceAsc") return a.price - b.price;
            if (sortBy === "priceDesc") return b.price - a.price;
            if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
            if (sortBy === "nameDesc") return b.name.localeCompare(a.name);
            return 0;
        });

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

    const handleImageClick = (image) => {
        if (image) {
            setSelectedImage(image);
            setOpenImage(true);
        } else {
            console.error("Invalid image URL:", image);
        }
    };

    const handleCloseImage = () => {
        setOpenImage(false);
        setSelectedImage("");
    };

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
                            <MenuIcon sx={{ color: "#134074" }} />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="black" noWrap sx={{ flexGrow: 1 }}>
                            Admin Panel
                        </Typography>
                        <div style={{ display: "flex" }}>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setSearch(inputValue);
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
                                    color: "white",
                                }}
                            />
                        </div>
                        {showResults && (
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
                                    zIndex: 1,
                                }}
                            >
                                <ul>
                                    {filteredUsers.length === 0 && search && (
                                        <li>No results found</li>
                                    )}
                                    {filteredUsers.map((result, index) => (
                                        <li key={index}
                                            style={{
                                                listStyleType: "none",
                                                padding: "3px",
                                                color: "black",
                                                display: "flex",
                                                gap: "10px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <SearchIcon />
                                            <Link
                                                to={`/${result._id}`}
                                                style={{ color: "black", textDecoration: "none" }}
                                            >
                                                {result.username}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
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
                            <MenuIcon sx={{ color: "#134074" }} />
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
                                    "&:hover": {
                                        backgroundColor: "#002c77",
                                    },
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
                                    <GroupIcon style={{ marginRight: "10px", color: "white" }} />
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
                                    "&:hover": {
                                        backgroundColor: "#002c77",
                                    },
                                }}
                            >
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        display: "flex",
                                    }}
                                    to="/admin/AddUser"
                                >
                                    <PersonAddAlt1Icon style={{ marginRight: "10px", color: "white" }} />
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
                                    "&:hover": {
                                        backgroundColor: "#002c77",
                                    },
                                }}
                            >
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        display: "flex",
                                    }}
                                    to="/admin/adminNot"
                                >
                                    <NotificationsNoneIcon style={{ marginRight: "10px", color: "white" }} />
                                    Notifications
                                </Link>
                            </Typography>
                        </ListItem>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: (theme) => theme.palette.background.default,
                        p: 3,
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#id</TableCell>
                                                    <TableCell>
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            Name
                                                            <IconButton onClick={() => {
                                                                setSortBy(sortBy === "nameAsc" ? "nameDesc" : "nameAsc");
                                                            }}>
                                                                {sortBy === "nameAsc" ? <ArrowUpwardIcon sx={{ color: "#134074" }} /> : <ArrowDownwardIcon sx={{ color: "#134074" }} />}
                                                            </IconButton>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            Price
                                                            <IconButton
                                                                onClick={() => {
                                                                    setSortBy(prevSort => prevSort === "priceAsc" ? "priceDesc" : "priceAsc");
                                                                }}
                                                            >
                                                                {sortBy === "priceAsc" ? <ArrowUpwardIcon sx={{ color: "#134074" }} /> : <ArrowDownwardIcon sx={{ color: "#134074" }} />}
                                                            </IconButton>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>Image</TableCell>
                                                    <TableCell>Description</TableCell>
                                                    <TableCell>Favorite</TableCell>
                                                    <TableCell>Rate</TableCell>
                                                    <TableCell>Edit</TableCell>
                                                    <TableCell>Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredUsers.map((user) => (
                                                    <TableRow key={user._id}>
                                                        <TableCell>{user._id}</TableCell>
                                                        <TableCell>{user.name}</TableCell>
                                                        <TableCell>{user.price}$</TableCell>
                                                        {user.image && (
                                                            <TableCell>
                                                                <img
                                                                    src={user.image}
                                                                    alt={user.username}
                                                                    style={{ width: "100px", height: "auto", cursor: 'pointer' }}
                                                                    onClick={() => handleImageClick(user.image)}
                                                                />
                                                            </TableCell>
                                                        )}
                                                        <TableCell>{user.description}</TableCell>
                                                        <TableCell>{user.favourite}</TableCell>
                                                        <TableCell>{user.rate}</TableCell>
                                                        <TableCell>
                                                            <Link
                                                                to={`/admin/edit/${user._id}`}



                                                                onMouseEnter={() => setHover(true)}
                                                                onMouseLeave={() => setHover(false)}
                                                            >
                                                                <EditIcon style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    fontSize: '15px',
                                                                    border: 'none',
                                                                    borderRadius: '5px',
                                                                    color: hover ? 'yellow' : 'black',
                                                                    backgroundColor: hover ? 'black' : 'white',
                                                                    transition: 'color 0.3s',
                                                                    cursor: 'pointer',
                                                                    padding: '10px',

                                                                }} />





                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            <button
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    fontSize: '15px',
                                                                    color: hover ? '#fff' : '#ff5b5c',
                                                                    border: 'none',
                                                                    borderRadius: '5px',
                                                                    cursor: 'pointer',
                                                                    backgroundColor: hover ? '#ff5b5c' : '#fde6e7',
                                                                    padding: '10px',
                                                                    transition: '0.3s',
                                                                }}
                                                                onMouseEnter={() => setHover(true)}
                                                                onMouseLeave={() => setHover(false)}

                                                                onClick={() => handleDelete(user._id)}
                                                            >
                                                                {/* <DeleteIcon /> */}
                                                                <i className='fa fa-trash-alt'></i>
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
                <Dialog open={openImage} onClose={handleCloseImage}>
                    <DialogContent>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseImage}
                            aria-label="close"
                            sx={{ position: "absolute", right: 0, top: -5 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Selected"
                                style={{ width: "98%", height: "auto" }}
                            />
                        ) : (
                            <p>No image selected</p>
                        )}
                    </DialogContent>
                </Dialog>
            </Box>
        </ThemeProvider >
    );
}
