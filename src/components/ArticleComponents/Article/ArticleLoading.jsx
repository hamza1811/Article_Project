import React from "react";
import ReactLoading from "react-loading";

function ArticleLoading() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className='pt-4'>
      <ReactLoading
        // style={{ display: "flex", justifyContent: "center" }}
        type='spin'
        color='black'
        height={70}
        width={70}
      />
    </div>
  );
}

export default ArticleLoading;
