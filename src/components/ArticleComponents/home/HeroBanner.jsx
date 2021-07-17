import React from "react";

function HeroBanner() {
  return (
    <div>
      <div
        className='card card-image'
        style={{
          backgroundImage:
            "url(https://cdn.hipwallpaper.com/i/97/45/5RpZQT.jpg",
        }}>
        <div className='text-white text-center rgba-stylish-strong py-5 px-4'>
          <div className='py-5'>
            {/* Content */}
            <h5 className='h5 orange-text'>
              <i className='fa fa-camera-retro' /> Thoughts
            </h5>
            <h2 className='card-title h2 my-4 py-2'>
              Let the world know, what you think!
            </h2>
            <p className='mb-4 pb-2 px-md-5 mx-md-5'>
              The first thing you learn when you’re Articleging is that people
              are one click away from leaving you. So you’ve got to get to the
              point, you can’t waste people’s time, you’ve got to give them some
              value for their limited attention span
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
