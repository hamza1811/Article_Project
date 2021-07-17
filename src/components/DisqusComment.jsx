/* eslint-disable react/jsx-no-undef */
import React from "react";
// import { graphql } from "gatsby";
import Disqus from "disqus-react";

function DisqusComment(props) {
  const disqusShortname = "articleproject";
  const disqusConfig = {
    url: `http://localhost:3000?${props.slug}`,
    identifier: props.slug,
    title: props.article,
    category_id: props.slug,
  };

  return (
    <div>
      {/* <DiscussionEmbed {...disqusConfig} /> */}
      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
}

export default DisqusComment;
