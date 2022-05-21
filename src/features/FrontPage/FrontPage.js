import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFrontPagePosts,
  selectFrontPagePosts,
  selectFrontPageStatus,
  selectFrontPageError,
} from "./frontPageSlice";

const FrontPage = () => {
  const dispatch = useDispatch();
  const allFrontPagePosts = useSelector(selectFrontPagePosts);
  const frontPageStatus = useSelector(selectFrontPageStatus);
  const frontPageError = useSelector(selectFrontPageError);

  useEffect(() => {
    if (frontPageStatus === "idle") {
      dispatch(fetchFrontPagePosts());
    }
  }, [dispatch, frontPageStatus]);

  return <div>FrontPage</div>;
};

export default FrontPage;
