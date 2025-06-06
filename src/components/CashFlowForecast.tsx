
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from "lucide-react";

const CashFlowForecast = () => {
  const forecastData = [
    { week: 'W1', inflow: 2400000, outflow: 1800000, net: 600000, risk: 'low' },
    { week: 'W2', inflow: 2200000, outflow: 1900000, net: 300000, risk: 'low' },
    { week: 'W3', inflow: 2600000, outflow: 2100000, net: 500000, risk: 'medium' },
    { week: 'W4', inflow: 2300000, outflow: 2200000, net: 100000, risk: 'medium' },
    { week: 'W5', inflow: 2100000, outflow: 2300000, net: -200000, risk: 'high' },
    { week: 'W6', inflow: 2500000, outflow: 2000000, net: 500000, risk: 'low' },
    { week: 'W7', inflow: 2700000, outflow: 1950000, net: 750000, risk: 'low' },
    { week: 'W8', inflow: 2400000, outflow: 2100000, net: 300000, risk: 'medium' },
    { week: 'W9', inflow: 2300000, outflow: 2250000, net: 50000, risk: 'high' },
    { week: 'W10', inflow: 2600000, outflow: 2000000, net: 600000, risk: 'low' },
    { week: 'W11', inflow: 2800000, outflow: 2100000, net: 700000, risk: 'low' },
    { week: 'W12', inflow: 2500000, outflow: 2200000, net: 300000, risk: 'medium' },
    { week: 'W13', inflow: 2400000, outflow: 2300000, net: 100000, risk: 'medium' }
  ];

  const formatCurrency = (value: number) => {
    return `₦${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          13-Week Rolling Cash Flow Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value: number, name: string) => [formatCurrency(value), name]}
                labelFormatter={(label) => `Week ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="inflow" 
                stackId="1"
                stroke="#22c55e" 
                fill="#22c55e" 
                fillOpacity={0.6}
                name="Inflow"
              />
              <Area 
                type="monotone" 
                dataKey="outflow" 
                stackId="2"
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.6}
                name="Outflow"
              />
              <Line 
                type="monotone" 
                dataKey="net" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Net Cash Flow"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600">Avg Weekly Inflow</div>
            <div className="text-lg font-bold text-green-700">₦2.4M</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-sm text-red-600">Avg Weekly Outflow</div>
            <div className="text-lg font-bold text-red-700">₦2.1M</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600">Projected Net</div>
            <div className="text-lg font-bold text-blue-700">₦350k/week</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <div className="text-sm font-medium text-yellow-800">Risk Alert</div>
          <div className="text-xs text-yellow-600">
            Week 5 shows negative cash flow. Week 9 shows minimal buffer. Prepare contingency.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashFlowForecast;
