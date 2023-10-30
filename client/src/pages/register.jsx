import Logo from "../components/Logo.jsx";
import Formraw from "../components/formraw.jsx";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import { Link, Form,  } from "react-router-dom";
import { SubmitBtn } from "../components/index.js";


const Register = () =>
{
  
  return (
    <Wrapper>
      <Form method="post" className="form ">
        <Logo />
        <h4>Register</h4>
        <Formraw name="name" type="text" />
        <Formraw
          name="lastName"
          type="text"
          
          labelValue="Last Name"
        />
        <Formraw name="location" type="text"  />
        <Formraw name="email" type="email"  />
        <Formraw name="password" type="password"  />
        <SubmitBtn formBtn={false} />
        <p>
          Already member
          <Link to="/Login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
