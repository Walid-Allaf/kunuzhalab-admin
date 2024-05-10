import React from "react";

const Image = ({ src, width, height }) => {
  return (
    <img
      width={width}
      height={height}
      src={`data:image/jpeg;base64,${src}`}
      alt="img-comp"
    />
  );
};

export default Image;
