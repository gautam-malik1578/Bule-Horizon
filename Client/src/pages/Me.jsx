import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useFindMe } from "../hooks/useFindMe";
import styles from "./Me.module.css";
import { setToken, toggleLogIn } from "../slices/userSlice";
import { useState } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useQueryClient } from "@tanstack/react-query";
import AvatarOptions from "../components/AvatarOptions";
function Me() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const { data, isLoading, error } = useFindMe();
  console.log(data);
  function handleLoggingOut() {
    toast.success("logged out", {
      icon: "🙋‍♂️",
      style: { color: "var(--color-red)" },
    });
    dispatch(setToken(""));
    dispatch(toggleLogIn());
    navigate("/");
    queryClient.invalidateQueries();
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.me}>
      <div className={styles.myDetails}>
        {showAvatarOptions ? (
          <AvatarOptions
            setShowAvatarOptions={setShowAvatarOptions}
            curAvatar={data.data?.user.avatar}
          />
        ) : (
          <div className={styles.avtar}>
            <figure>
              {/* <img src={`./${data.data?.user.avatar}.png`} alt="userPic" /> */}
              <img src={data.data?.user.avatarUrl} alt="userPic" />
            </figure>
            <span>{data.data?.user.avatar}</span>
            <button
              onClick={() => {
                setShowAvatarOptions(true);
              }}
            >
              change avatar
            </button>
          </div>
        )}
        <div className={styles.info}>
          <p>my details</p>
          <div className={styles.myInfo}>
            <div>
              <span>username</span>
              <span>{data.data?.user.username}</span>
            </div>
            <div>
              <span>email</span>
              <span>{data.data?.user.email}</span>
            </div>
            <div>
              <span>role</span>
              <span>{data.data?.user.role}</span>
            </div>
            <div>
              <span>gender</span>
              <span>{data.data?.user.sex}</span>
            </div>
          </div>
          <div className={styles.btns}>
            <button
              style={
                showForm
                  ? {
                      backgroundColor: "var(--color-red)",
                      color: "white",
                      border: "1px solid var(--color-red)",
                    }
                  : {}
              }
              onClick={() => {
                setShowForm((showForm) => !showForm);
              }}
            >
              {showForm ? "cancel reset" : "reset password"}
            </button>
            <button
              onClick={() => {
                handleLoggingOut();
              }}
            >
              logout
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              back
            </button>
          </div>
          {showForm && <ResetPasswordForm setShowForm={setShowForm} />}
        </div>
      </div>
    </div>
  );
}

export default Me;
