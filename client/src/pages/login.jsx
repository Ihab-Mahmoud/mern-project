import Logo from "../components/Logo";
import Formraw from "../components/formraw";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, Form, useNavigate,  } from "react-router-dom";
import { SubmitBtn } from "../components/index";
import { toast } from "react-toastify"
import fetch from "../utils/custom-axios";
const Login = () =>
{
  const navigation = useNavigate()
  
  const demoUser = async () =>
  {
    const data = {
      email: "Demo@gmail.com",
      password: "demo12345",
    };
    try {
      await fetch("/login","post",data)
      toast.success("take a test drive");
      navigation("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  }
  return (
    <Wrapper>
      <Form method="post" className="form ">
        <Logo />
        <h4>Login</h4>
        <Formraw name="email" type="email" />
        <Formraw name="password" type="password"  />
        <SubmitBtn formBtn={false} />
        <button type="button" className="btn btn-block" onClick={demoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Login;