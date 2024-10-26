import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {  userLoggedIn } from "@/redux/features/auth/authSlice";


export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints:(builder) =>({
        refreshToken: builder.query({
            query:(data) =>({
                url:"refresh",
                method:"GET",
                credentials: "include" as const,
            }),
        }),
        loadUserInformation: builder.mutation({
                query:(data) =>({
                    url:"user-information",
                    method:"POST",
                    body:{
                      data
                    }
                })
        }),

        loadUser: builder.query({
          query:(data) =>({
              url:"me",
              method:"GET",
              credentials: "include" as const,
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
              const result = await queryFulfilled;
              const value = sessionStorage.getItem('accessToken');
              dispatch(
                userLoggedIn({
                  accessToken: value || '', 
                  user:result.data.user,
                })
              );
            } catch (error) {
              console.error("Login Error: ", error);
            }
            },
  })
    }),
});
export const {useRefreshTokenQuery,useLoadUserQuery, useLoadUserInformationMutation} = apiSlice;