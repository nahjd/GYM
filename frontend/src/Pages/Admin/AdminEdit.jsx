// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserById, updateUser } from '../../redux/slices/userSlice';
// import { TextField, Button, Container, Paper } from '@mui/material';
// import "./AdminEdit.scss"

// export default function EditUser() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const user = useSelector(state => state.gym.users.find(user => user.id === id));
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [image, setImage] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [username, setUsername] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (user) {
//             setName(user.name);
//             setPrice(user.price);
//             setImage(user.image);
//             setEmail(user.email);
//             setPassword(user.password);
//             setUsername(user.username);
//             setLoading(false);
//         } else {
//             dispatch(getUserById(id))
//                 .unwrap()
//                 .then((userData) => {
//                     console.log("User data fetched:", userData);
//                     setName(userData.name);
//                     setPrice(userData.price);
//                     setImage(userData.image);
//                     setEmail(userData.email);
//                     setPassword(userData.password);
//                     setUsername(userData.username);
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     console.error("Failed to load user details:", error);
//                     setLoading(false);
//                     setError("Failed to load user details");
//                 });
//         }
//     }, [dispatch, id, user]);

//     const handleUpdate = (e) => {
//         e.preventDefault();
//         const updatedUser = { _id: id, name, price, image, email, password, username };
//         dispatch(updateUser(updatedUser))
//             .unwrap()
//             .then(() => navigate('/admin/admin'))
//             .catch(error => {
//                 console.error("Failed to update user:", error);
//                 setError("Failed to update user");
//             });
//     };

//     if (loading) {
//         return (
//             <div className="loader-container">
//                 <div className="loader"></div>
//             </div>
//         )

//     }

//     return (
//         <Container maxWidth="sm">
//             <Paper style={{ padding: 20 }}>
//                 <form onSubmit={handleUpdate}>
//                     <TextField
//                         label="Name"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Price"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Image URL"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={image}
//                         onChange={(e) => setImage(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Email"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Password"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Username"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         style={{ marginTop: 20 }}
//                     >
//                         Update User
//                     </Button>
//                 </form>
//             </Paper>
//         </Container>
//     );
// }
