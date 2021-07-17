import React from "react";

function Footer() {
  return (
    <div className='container'>
      {/* Footer */}
      <footer className='page-footer font-small bg-gray bg-gradient pt-4'>
        {/* Footer Text */}
        <div className='container-fluid text-center text-md-left'>
          {/* Grid row */}
          <div className='row'>
            {/* Grid column */}

            {/* Grid column */}
            <hr />
            {/* Grid column */}

            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Footer Text */}
        {/* Copyright */}
        {/* <div className='footer-copyright text-center py-3'>
          © 2021 Copyright: Hamza Khan
        </div> */}
        <div
          className='footer-copyright text-center py-3'
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2021 Copyright:&nbsp;
          <a
            // className='text-dark'
            target='_blank'
            href='https://www.linkedin.com/in/hamza-khan-0b073815b/'
            rel='noreferrer'>
            Hamza Khan
          </a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
  );
}

export default Footer;
