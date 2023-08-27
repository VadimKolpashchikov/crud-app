import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import "../styles/components/modal-window.scss";
import { getMutablePost } from "../store/postSlice";
import { usePatchPostMutation } from "../store/api/json.api";

const ModalWindow: React.FC = () => {
  const dispatch = useDispatch();
  const mutablePost = useSelector((state: RootState) => state.post.mutablePost);
  const [patchPost] = usePatchPostMutation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
    setTitle(mutablePost.title);
    setBody(mutablePost.body);
  }, [mutablePost]);

  const handlerDeletePost = async () => {
    await patchPost({
      id: mutablePost.id,
      patch: {
        title: title.trim(),
        body: body.trim(),
      },
    }).unwrap();
    dispatch(getMutablePost({ ...mutablePost, title: title, body: body }));
  };

  return (
    <div id="modal-window" className="modal-window">
      <div className="modal-window__box">
        <h3 className="modal-window__title">Post Editing</h3>
        <form
          className="modal-window__form"
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="modal-window__label">
            <span>Title</span>
            <input
              className="input"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="modal-window__label">
            <span>Text</span>
            <textarea
              className="input textarea"
              name="body"
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </label>
          <button
            disabled={
              !title.trim().length ||
              !body.trim().length ||
              (mutablePost.title === title && mutablePost.body === body)
            }
            type="submit"
            className="modal-window__btn"
            onClick={() => handlerDeletePost()}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;
