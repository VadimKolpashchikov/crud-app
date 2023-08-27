import React from "react";
import {
  useGetUserPostsQuery,
  useDeletePostMutation,
} from "../store/api/json.api";
import Fancybox from "./UI/fancy/Fancybox";
import MyLoader from "./UI/MyLoader/MyLoader";
import "../styles/components/posts-item.scss";
import { getMutablePost } from "../store/postSlice";
import { useDispatch } from "react-redux";

interface IPostsItem {
  userId: number;
}

const PostsItem: React.FC<IPostsItem> = ({ userId }) => {
  const { isLoading, isError, data } = useGetUserPostsQuery(userId);
  const [deletePost] = useDeletePostMutation();
  const dispatch = useDispatch();
  const handlerDeletePost = async (postId: number) => {
    await deletePost(postId).unwrap();
  };

  return (
    <>
      {isLoading && !isError && <MyLoader />}
      {isError && (
        <h3 className="error-text">Failed to load posts of User-{userId}</h3>
      )}
      {data?.map((post) => (
        <div key={post.id} className="posts-item">
          <p className="posts-item__user">User-{post.userId}</p>
          <h4 className="posts-item__title">{post.title}</h4>
          <p className="posts-item__text">{post.body}</p>
          <div className="posts-item__btn-box">
            <Fancybox>
              <a
                data-fancybox
                href="#modal-window"
                onClick={() => {
                  dispatch(getMutablePost(post));
                }}
                className="posts-item__btn_edit posts-item__btn"
              >
                Edit
              </a>
            </Fancybox>
            <button
              onClick={() => handlerDeletePost(post.id)}
              className="posts-item__btn_del posts-item__btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostsItem;
