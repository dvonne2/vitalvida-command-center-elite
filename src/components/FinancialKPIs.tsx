
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const FinancialKPIs = () => {
  const kpis = [
    { 
      metric: 'Gross Margin', 
      value: 42.5, 
      unit: '%', 
      target: 45, 
      trend: 'down',
      change: -2.1 
    },
    { 
      metric: 'CAC (Cost per Order)', 
      value: 850, 
      unit: '₦', 
      target: 750, 
      trend: 'up',
      change: 13.3 
    },
    { 
      metric: 'Return Rate', 
      value: 8.2, 
      unit: '%', 
      target: 5, 
      trend: 'up',
      change: 1.8 
    },
    { 
      metric: 'Refund %', 
      value: 12.1, 
      unit: '%', 
      target: 8, 
      trend: 'up',
      change: 2.4 
    },
    { 
      metric: 'Inventory Turnover', 
      value: 6.8, 
      unit: 'x', 
      target: 8, 
      trend: 'down',
      change: -0.9 
    },
    { 
      metric: 'ROAS (Ad Spend)', 
      value: 3.2, 
      unit: 'x', 
      target: 4, 
      trend: 'down',
      change: -0.5 
    }
  ];

  const formatValue = (value: number, unit: string) => {
    if (unit === '₦') {
      return `₦${value.toLocaleString()}`;
    }
    return `${value}${unit}`;
  };

  const isOnTarget = (value: number, target: number, unit: string) => {
    if (unit === '%' || unit === '₦') {
      return value <= target;
    }
    return value >= target;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Financial KPIs (Live)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {kpis.map((kpi, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">{kpi.metric}</span>
                <Badge variant={isOnTarget(kpi.value, kpi.target, kpi.unit) ? "default" : "destructive"}>
                  {isOnTarget(kpi.value, kpi.target, kpi.unit) ? "On Target" : "Off Target"}
                </Badge>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-lg font-bold">
                    {formatValue(kpi.value, kpi.unit)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Target: {formatValue(kpi.target, kpi.unit)}
                  </div>
                </div>
                
                <div className={`flex items-center gap-1 text-xs ${
                  kpi.trend === 'up' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {kpi.trend === 'up' ? 
                    <TrendingUp className="w-3 h-3" /> : 
                    <TrendingDown className="w-3 h-3" />
                  }
                  {Math.abs(kpi.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <div className="text-sm font-medium text-red-800">Performance Alert</div>
          <div className="text-xs text-red-600">
            4 of 6 KPIs are off target. Immediate action required on CAC and return rates.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialKPIs;
