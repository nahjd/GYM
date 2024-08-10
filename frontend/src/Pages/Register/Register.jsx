import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
import "animate.css";
import "./Register.scss";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import img9 from "./../../../images/gym1.jpg"
import img10 from "./../../../images/gym2.jpg"





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
                .post("http://localhost:3030/nem", {
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
        <>
            <div className="register">
                <div className="left">
                    <div className="left-container">
                        <div className="logo animate__animated animate__fadeIn">
                            <img
                                src="https://www.ormo.com.tr/CMSFiles/Image/Content/636228611439359116.jpg"
                                alt=""
                            />
                        </div>
                        <div className="form">
                            <div className="form-head">
                                <p className="head animate__animated animate__fadeIn">
                                    Sign up to get started
                                </p>
                                <p className="text animate__animated animate__fadeIn">
                                    If you already have an account,
                                    <span
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        Login here!
                                    </span>
                                </p>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="firstName-lastName">
                                    <div className="label-input-first-last">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstName}
                                        />
                                        {formik.touched.firstName && formik.errors.firstName ? (
                                            <div className="error">{formik.errors.firstName}</div>
                                        ) : null}
                                    </div>
                                    <div className="label-input-first-last">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastName}
                                        />
                                        {formik.touched.lastName && formik.errors.lastName ? (
                                            <div className="error">{formik.errors.lastName}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="email-input">
                                    <div className="label-input">
                                        <label
                                            className="animate__animated animate__fadeIn"
                                            htmlFor="email"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            className="animate__animated animate__fadeIn"
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="error">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="passwords">
                                    <div className="label-input">
                                        <label
                                            className="animate__animated animate__fadeIn"
                                            htmlFor="username"
                                        >
                                            Username
                                        </label>
                                        <input
                                            className="animate__animated animate__fadeIn"
                                            id="username"
                                            name="username"
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.username}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div className="error">{formik.errors.username}</div>
                                        ) : null}
                                    </div>
                                    <div className="label-input">
                                        <label
                                            className="animate__animated animate__fadeIn"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            className="animate__animated animate__fadeIn"
                                            id="password"
                                            name="password"
                                            placeholder="***"
                                            type="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="error">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <button
                                    className="animate__animated animate__fadeIn"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >
                                    Get Started
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <Swiper
                        // install Swiper modules
                        style={{ height: "100%" }}
                        centeredSlides={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log("slide change")}
                    >
                        <SwiperSlide>
                            <div className="image">
                                <img
                                    src={img9}
                                    alt=""
                                />
                                <div className="text-logo">
                                    <div className="logo">
                                        <img
                                            src="https://www.ormo.com.tr/CMSFiles/Image/Content/636228611439359116.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text">
                                        <p className="head">NAKO GYM</p>
                                        <p className="desc">
                                            Bodybuilding is 10% work, 20% nutrition, and 70% rest.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image">
                                <img
                                    src={img10}
                                    alt=""
                                />
                                <div className="text-logo">
                                    <div className="logo">
                                        <img
                                            src="https://www.ormo.com.tr/CMSFiles/Image/Content/636228611439359116.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text">
                                        <p className="head">NAKO GYM</p>
                                        <p className="desc">
                                            When you're about to give up, remember why you started
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default Register;