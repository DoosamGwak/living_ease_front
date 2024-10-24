import styles from "./Signup.module.css";
import classNames from "classnames/bind";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

type SignupFormsInputs = {
  email: string;
  nickname: string;
  password: string;
  password2: string;
};

const Signup = () => {
  const { signupUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormsInputs>();

  const handleLogin = (form: SignupFormsInputs) => {
    signupUser(form.email, form.nickname, form.password, form.password2);
  };
  return (
    <form className={cx("login-form")} onSubmit={handleSubmit(handleLogin)}>
      <div className={cx("login-div")}>
        <h1>회원가입</h1>
        <input
          type="email"
          placeholder="이메일"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && errors.email.type === "required" && (
          <div className={cx("password-warning")}>※ 이메일은 필수값입니다.</div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div className={cx("password-warning")}>
            ※ 유효하지 않은 이메일입니다.
          </div>
        )}
        <input
          type="nickname"
          placeholder="닉네임"
          {...register("nickname", { required: true, maxLength: 10 })}
        />
        {errors.nickname && errors.nickname.type === "required" && (
          <div className={cx("password-warning")}>※ 닉네임은 필수값입니다.</div>
        )}
        {errors.nickname && errors.nickname.type === "maxLength" && (
          <div className={cx("password-warning")}>
            ※ 닉네임은 최대 10자리까지 가능합니다.
          </div>
        )}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 20,
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <div className={cx("password-warning")}>
            ※ 8자 이상 대문자, 소문자, 숫자, 특수문자 중 3가지 이상을 사용해
            주세요.
          </div>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <div className={cx("password-warning")}>
            ※ 8자 이상의 비밀번호를 설정해주세요.
          </div>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <div className={cx("password-warning")}>
            ※ 비밀번호는 최대 20자까지 가능합니다.
          </div>
        )}

        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          {...register("password2", { required: true })}
        />
        {errors.password2 ? (
          <p className={cx("password-warning")}>{errors.password2.message}</p>
        ) : (
          ""
        )}
        <button className={cx("login-btn")} type="submit">
          회원 가입하기
        </button>
      </div>

      <div className={cx("divider")}>
        <span>또는</span>
      </div>

      <button
        className={cx("google-btn")}
        type="button"
        onClick={() => toast("구글 로그인은 준비 예정입니다.")}
      >
        구글 계정으로 회원 가입하기
      </button>
    </form>
  );
};

export default Signup;
