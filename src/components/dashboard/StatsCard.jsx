import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({ title, value, icon: Icon, bgColor, change, changeType }) {
    return (
        <Card className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 ${bgColor} rounded-full opacity-10`} />
            <CardHeader className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-600">{title}</p>
                        <CardTitle className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">
                            {value}
                        </CardTitle>
                    </div>
                    <div className={`p-3 rounded-xl ${bgColor} bg-opacity-20`}>
                        <Icon className={`w-5 h-5 ${bgColor.replace('bg-', 'text-')}`} />
                    </div>
                </div>
                {change && (
                    <div className="flex items-center mt-4 text-sm">
                        {changeType === 'up' ? (
                            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                        ) : (
                            <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
                        )}
                        <span className={changeType === 'up' ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                            {change}
                        </span>
                    </div>
                )}
            </CardHeader>
        </Card>
    );
}