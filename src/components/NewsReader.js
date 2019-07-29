import React from "react";

function NewsReader({ newsArticle, index }) {
  let divStyle = { backgroundImage: "url(" + newsArticle.urlToImage + ")" };
  return (
    <div id={`newsBox${String(index + 1)}`} style={divStyle}>
      <a href={newsArticle.url} target="_blank" rel="noopener noreferrer">
        <div id="CT">{newsArticle.title.slice(0, 58) + "..."}</div>
      </a>
    </div>
  );
}
export default NewsReader;
