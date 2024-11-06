import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getUserAnalytics: builder.query({
            query: () => ({
                url: 'get-users-analytics',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
        getCourseAnalytics: builder.query({
            query: () => ({
                url: 'get-courses-analytics',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
        getOrderAnalytics: builder.query({
            query: () => ({
                url: 'get-orders-analytics',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
    }),
    
});

export const { useGetCourseAnalyticsQuery, useGetUserAnalyticsQuery, useGetOrderAnalyticsQuery } = analyticsApi;
