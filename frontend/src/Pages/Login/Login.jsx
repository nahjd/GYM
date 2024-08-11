import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import "swiper/css/effect-fade";
import "animate.css";
import "./Login.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import img10 from "./../../../images/gym1.jpg"
import img9 from "./../../../images/gym2.jpg"

import { useEffect, useState } from "react";

function Login() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.gym.data);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getAllUsers())
            .then(() => setLoading(false))
            .catch((error) => {
                console.error('Failed to fetch users', error);
                setLoading(false);
            });
    }, [dispatch]);

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Required"),
            username: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            axios.post("https://nemm-1.onrender.com/nem", values).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    const userId = res.data;
                    localStorage.setItem("id", JSON.stringify(userId));
                    navigate("/home");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.data,
                    });
                }
            });
        },
    });

    if (loading) {
        return <div className='loading'></div>;
    }

    return (
        <div className="login">
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
                                Sign in to your account
                            </p>
                            <p className="text animate__animated animate__fadeIn">
                                If you haven’t signed up yet.
                                <span
                                    onClick={() => {
                                        navigate("/register");
                                    }}
                                >
                                    Register here!
                                </span>
                            </p>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
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
                                    type="username"
                                    placeholder="username"
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

                            <button
                                className="animate__animated animate__fadeIn"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="right">
                <Swiper
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
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default Login;
