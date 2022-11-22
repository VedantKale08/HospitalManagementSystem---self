import React from 'react'
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaYoutubeSquare,
    FaTelegramPlane,
} from "react-icons/fa";
import './Footer.css'


const Footer = () => {
  return (
    <div><div className="section1">
    <div className="container">
        <div className="up">
            <a href='#' className='upward'></a>
        </div>
        <div className="main">
            {/* <div className="first">
                <h4 className='fh4'>Diploma Explorer</h4>
                <p className='fp'>
                    We are here to help the students who have just passed their
                    SSC exams and are looking to kickstart their carrier in more
                    professional courses rather than ony theoratical knowledge.
                </p>
            </div> */}
            <div className="second">
                <h4 className='sh4'>Let's Communicate</h4>
                <a
                    class="btn btn-outline-primary btn-floating m-4 btn-lg"
                    href="#!"
                    role="button"
                >
                    <FaFacebookSquare style={{ fontSize: "2rem" }} />
                </a>
                <a
                    class="btn btn-outline-success btn-floating m-3 btn-lg"
                    href="#!"
                    role="button"
                >
                    <FaInstagramSquare style={{ fontSize: "2rem" }} />
                </a>
                <a
                    class="btn btn-outline-info btn-floating m-4 btn-lg"
                    href="#!"
                    role="button"
                >
                    <FaTelegramPlane style={{ fontSize: "2rem" }} />
                </a>
                <a
                    class="btn btn-outline-danger btn-floating m-4 btn-lg"
                    href="#!"
                    role="button"
                >
                    <FaYoutubeSquare style={{ fontSize: "2rem" }} />
                </a>
            </div>
            {/* <div className="third">
                <h4 className='fh4'>Who we are?</h4>
                <p className='fp'>
                    We are the college students currently pursuing our diploma in
                    Computer Engineering. Our dream is to build powerful and
                    useful websites that will help to solve real world scenarios.
                </p>
            </div> */}
        </div>
        <div className="copyright">
            <p className='cp'>
                Copyright &copy; Vedant Kale 2022 Inc. All Rights Reserved.
            </p>
        </div>
    </div>
</div></div>
  )
}

export default Footer