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
import { useEffect } from "react";


function Login() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.gym.users);
  console.log(users);

  useEffect(() => {
    dispatch(getAllUsers());
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
          const find = users.find((element) => element._id === res.data);

          if (find?.isAdmin) {
            navigate("/admin");
            localStorage.setItem("id", JSON.stringify(res.data));
            localStorage.setItem("isAdmin", "true");
          } else {
            console.log(res);
            localStorage.setItem("id", JSON.stringify(res.data));
            navigate("/home");
          }
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

  return (
    <>
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
                  If you haven’t signed up yet.{" "}
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
                    type="text"
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
                  src="https://m.media-amazon.com/images/S/pv-target-images/fb97a6ff4bb0a0f10f33b8020b3ff13218955a5d08a04a11cc4cc26f745fb468.jpg"
                  alt=""
                />
                <div className="text-logo">
                  <div className="logo">
                    <img
                      src="https://m.media-amazon.com/images/I/81L6airBNoL._AC_UF1000,1000_QL80_.jpg"
                      alt=""
                    />
                  </div>
                  <div className="text">
                    <p className="head">Kung Fu Panda</p>
                    <p className="desc">
                      Dün Artık Tarih Oldu, Yarın ise Bir Bilmece, Bugün Sana
                      Hediyedir..
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image">
                <img
                  src="https://img-s1.onedio.com/id-56eec0d7d9ab5e9b2f3c3c0a/rev-0/raw/s-963b658d4a920a7a1be43ee85adc02ba0a8785a2.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Login;
