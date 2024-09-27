import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLoggedIn, userLoggedOut} from "./authSlice";

// Define types for the responses and input data
type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  email: string;
  password: string;
  name: string;
};

type ActivationData = {
  activation_token: string;
  activation_code: string;
};

type ActivationResponse = {
  message: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for registration
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: 'registration', // Consider using a proxy setup in development
        method: "POST",
        body: data,
        credentials: "include", // Include cookies or other credentials
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken, // Dispatch registration action with token
            })
          );
        } catch (error) {
          console.error("Registration Error: ", error);
        }
      },
    }),

    // Mutation for activation
    activation: builder.mutation({
      query: ({activation_token , activation_code}) =>({
        url:"activate-user",
        method:"POST",
        body:{
          activation_token,
          activation_code
        },
      })
    }),
    login: builder.mutation({
      query:({email,password})=>({
        url:"Login",
        method:"POST",
        body:{
          email, password
        },
        credentials: "include" as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken, 
              user:result.data.user,
            })
          );
        } catch (error) {
          console.error("Login Error: ", error);
        }
      },
    }),
 
socialAuth: builder.mutation({
  query:({email,name,avatar})=>({
    url:"social-auth",
    method:"POST",
    body:{
      email, name, avatar
    },
    credentials: "include" as const
  }),
  async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    try {
      const result = await queryFulfilled;
      dispatch(
        userLoggedIn({
          accessToken: result.data.activationToken, 
          user:result.data.user,
        })
      );
    } catch (error) {
      console.error("Login Error: ", error);
    }
  },
}),
logOut: builder.query({
  query:()=>({
    url:"logout",
    method:"GET",
    credentials: "include" as const
  }),
  async onQueryStarted(arg, {  dispatch }) {
    try {
      
      dispatch(
        userLoggedOut()
      );
    } catch (error:any) {
      console.log(error);
    }
  },
})
}),
});

// Export the hooks for usage in components
export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation,useLogOutQuery } = authApi;
