import { styles } from '@/app/styles/style';
import Loader from '@/components/Loader/Loader';
import { useGetUserAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React from 'react';
import {
    BarChart,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    AreaChart,
    Area
} from "recharts";

type Props = {
    isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading, isError } = useGetUserAnalyticsQuery({});
    const analyticsData: any = [];

    // Check if data exists and populate analyticsData
    if (data && data.users?.last12Months) {
        data.users.last12Months.forEach((item: any) => {
            analyticsData.push({ name: item.month, count: item.count });
        });
    }

    if (isLoading) return <Loader />;
    if (isError) return <p>Error loading data</p>;

    return (
        <>
            <div className={`${!isDashboard ? 'mt-[50px]' : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
                <div className={`${isDashboard ? "!ml-8 mb-5" : ''}`}>
                    <h1 className={`${styles.title} ${isDashboard && '!test-[20px]'} px-5 !text-start`}>Users Analytics</h1>
                    {
                        !isDashboard && (
                            <p className={`${styles.label} px-5`}>Last 12 months analytics data</p>
                        )
                    }
                </div>
                <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center`}>
                    <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? "50%" : '100%'}>
                        {analyticsData.length === 0 ? (
                            <p>No data available for the selected period.</p>
                        ) : (
                            <AreaChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 'dataMax + 5']} />
                                <Tooltip />
                                <Area type="monotone" dataKey="count" stroke="#4d62d9" fill="#4d62d9" />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default UserAnalytics;
