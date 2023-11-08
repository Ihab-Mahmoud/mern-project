import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from "../assets/wrappers/LandingPage.js"
import { Link } from "react-router-dom"
import Logo from "../components/Logo.jsx"
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            job tracking app is a comprehensive tool designed to streamline job
            offers that the user have, allowing for efficient choosing and
            monitoring. With its user-friendly interface and real-time updates,
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="main-img img"></img>
      </div>
    </Wrapper>
  );
}

export default Landing;