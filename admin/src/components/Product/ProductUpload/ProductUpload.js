import React from "react";

import MediaAndPublished from "./MediaAndPublished";
import Infomation from "./Infomation";

function ProductUpload() {
  return (
    <>
      <div className=" px-7 w-full">
        <div className="shadow rounded-lg border p-3 my-4 mx-0">
          <p className="font-extrabold text-2xl "> Product Upload</p>
        </div>
        <Infomation />
        <MediaAndPublished />
      </div>{" "}
    </>
  );
}

export default ProductUpload;
