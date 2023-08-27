import React from "react";
import UsersItem from "./UsersItem";
import "../styles/components/users-list.scss";
import { useGetUsersQuery } from "../store/api/json.api";
import { IUser } from "@/types/IUser";
import MyLoader from "./UI/MyLoader/MyLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const UsersList: React.FC = () => {
  const { isLoading, isError, data: users } = useGetUsersQuery("");
  const activeUser = useSelector((state: RootState) => state.user.activeUser);
  return (
    <div className="users-list">
      {isLoading && !isError && <MyLoader />}
      {isError && <h3 className="error-text">Error...</h3>}
      {!isLoading && (
        <ul className="users-list__list">
          {users?.map((user: IUser) => (
            <UsersItem
              key={user.id}
              id={user.id}
              name={user.name}
              active={activeUser.includes(user.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
