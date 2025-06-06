
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const CostToServePanel = () => {
  const costData = [
    { metric: 'Per Fulfilled Order', cost: 850, trend: 'down', change: -12 },
    { metric: 'Per Failed Order', cost: 1200, trend: 'up', change: 8 },
    { metric: 'Per Refund', cost: 650, trend: 'down', change: -5 },
    { metric: 'Per Delivery Zone (Lagos)', cost: 750, trend: 'up', change: 15 },
    { metric: 'DA Cost Per Drop', cost: 400, trend: 'down', change: -8 },
    { metric: 'Re-dispatch Cost', cost: 900, trend: 'up', change: 22 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Cost-to-Serve Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {costData.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium text-sm">{item.metric}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">{formatCurrency(item.cost)}</span>
                <div className={`flex items-center gap-1 text-xs ${
                  item.trend === 'up' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {item.trend === 'up' ? 
                    <TrendingUp className="w-3 h-3" /> : 
                    <TrendingDown className="w-3 h-3" />
                  }
                  {Math.abs(item.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-800">Efficiency Target</div>
          <div className="text-xs text-blue-600">
            Target: ₦800 per fulfilled order. Current average: ₦850 (+6.25% over target)
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostToServePanel;
