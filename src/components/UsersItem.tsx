import React from "react";
import "../styles/components/users-item.scss";
import { useDispatch } from "react-redux";
import { toggToActiveUser } from "../store/userSlice";
interface IUsersItem {
  id: number;
  name: string;
  active: boolean;
}

const UsersItem: React.FC<IUsersItem> = ({ id, name, active }) => {
  const dispatch = useDispatch();
  return (
    <li
      className={`users-item ${active ? "users-item_active" : ""}`}
      onClick={() => dispatch(toggToActiveUser(id))}
    >
      <span>{id}.</span> {name}
    </li>
  );
};

export default UsersItem;
