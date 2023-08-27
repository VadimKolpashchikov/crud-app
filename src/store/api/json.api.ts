import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/IUser";
import { IPost } from "../../types/IPost";
export const jsonApi = createApi({
  reducerPath: "json/api",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (build) => ({
    getUsers: build.query<IUser[], string>({
      query: (param) => ({
        url: `users${param}`,
      }),
    }),
    getUserPosts: build.query<IPost[], number>({
      query: (id) => `/posts?userId=${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    deletePost: build.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Posts", id: id }],
    }),
    patchPost: build.mutation<
      IPost,
      { id: number; patch: { title: string; body: string } }
    >({
      query: ({ id, patch }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: patch,
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id: id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserPostsQuery,
  useDeletePostMutation,
  usePatchPostMutation,
} = jsonApi;
