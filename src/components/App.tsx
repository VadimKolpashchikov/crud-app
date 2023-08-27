import React from "react";
import UsersList from "./UsersList";
import PostsList from "./PostsList";
import ModalWindow from "./ModalWindow";
const App: React.FC = () => {
  return (
    <>
      <UsersList />
      <PostsList />
      <ModalWindow />
    </>
  );
};

export default App;
