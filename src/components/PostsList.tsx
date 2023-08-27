import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PostsItem from "./PostsItem";
import "../styles/components/posts-list.scss";
const PostsList: React.FC = () => {
  const activeUser = useSelector((state: RootState) => state.user.activeUser);

  return (
    <div className="posts-list">
      {!activeUser.length ? (
        <h3 className="posts-list__empty-message">Post list is empty</h3>
      ) : (
        activeUser.map((userId) => <PostsItem key={userId} userId={userId} />)
      )}
    </div>
  );
};

export default PostsList;
