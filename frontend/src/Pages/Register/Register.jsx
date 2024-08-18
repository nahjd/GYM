import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "animate.css";
import "./Register.scss";

function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            username: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            lastName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
            username: Yup.string()
                .min(6, "Username is too short - should be 6 chars minimum.")
                .max(15, "Must be 15 characters or less")
                .required("Required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            axios
                .post("https://short-1.onrender.com/stella", {
                    ...values,
                })
                .then((res) => {
                    if (res.status === 201) {
                        Swal.fire({
                            title: "Registration Successful",
                            text: "You have been registered successfully!",
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/");
                            }
                        });
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.response ? error.response.data.message : error.message,
                    });
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div className="register">
            <section>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>


                <div className="signout">
                    <div className="content">
                        <h2>Sign Out</h2>
                        <div className="form">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstName}
                                    />
                                    <i>First Name</i>
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className="error">{formik.errors.firstName}</div>
                                    ) : null}
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.lastName}
                                    />
                                    <i>Last Name</i>
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className="error">{formik.errors.lastName}</div>
                                    ) : null}
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                    />
                                    <i>Username</i>
                                    {formik.touched.username && formik.errors.username ? (
                                        <div className="error">{formik.errors.username}</div>
                                    ) : null}
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    <i>Email</i>
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="error">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    <i>Password</i>
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="error">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="submit"
                                        value="Register"
                                        disabled={formik.isSubmitting}

                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;
