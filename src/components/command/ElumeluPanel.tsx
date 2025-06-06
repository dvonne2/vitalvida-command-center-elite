
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionGate, useAuth } from "@/components/auth/LoginSystem";
import { TrendingUp, DollarSign, AlertTriangle, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ElumeluPanel = () => {
  const { auditLog } = useAuth();

  // 13-Week Cash Flow Forecast Data
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

  // Live KPI Data
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

  const formatCurrency = (value: number) => {
    return `₦${(value / 1000000).toFixed(1)}M`;
  };

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

  const handleForecastUpdate = () => {
    auditLog('Updated cash flow forecast', 'Elumelu Panel');
  };

  const generateBoardReport = () => {
    auditLog('Generated board-grade PDF report', 'Elumelu Panel');
    // In real implementation, would generate and download PDF
    alert('Board-grade PDF report generated and sent to admin@vitalvida.ng and vitalvidafinancecfo@gmail.com');
  };

  return (
    <div className="space-y-6">
      {/* 13-Week Cash Flow Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            13-Week Rolling Cash Flow Forecast
          </CardTitle>
          <PermissionGate panel="elumelu" action="edit">
            <Button size="sm" onClick={handleForecastUpdate}>
              Update Forecast
            </Button>
          </PermissionGate>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Financial KPIs */}
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
                        <TrendingUp className="w-3 h-3 rotate-180" />
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

        {/* Bank Reconciliation Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Bank Reconciliation Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Moniepoint Balance</span>
                <span className="text-green-700 font-bold">₦2,847,350</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Bank Balance</span>
                <span className="text-blue-700 font-bold">₦2,802,150</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium">Variance</span>
                <span className="text-red-700 font-bold">₦45,200</span>
              </div>
              
              <PermissionGate 
                panel="elumelu" 
                action="edit"
                fallback={
                  <Button variant="outline" className="w-full" disabled>
                    View Only Access
                  </Button>
                }
              >
                <Button variant="outline" className="w-full">
                  Investigate Mismatch
                </Button>
              </PermissionGate>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium text-yellow-800">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                Reconciliation Alert
              </div>
              <div className="text-xs text-yellow-600">
                Daily variance exceeds ₦40k threshold. Requires FC investigation.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Board-Grade PDF Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Board-Grade Monthly PDF Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600">Next Auto-Send</div>
              <div className="text-lg font-bold text-blue-700">1st Sunday</div>
              <div className="text-xs text-blue-500">of each month</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600">Recipients</div>
              <div className="text-sm font-bold text-green-700">CEO + FC</div>
              <div className="text-xs text-green-500">Board-ready format</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-purple-600">Last Generated</div>
              <div className="text-sm font-bold text-purple-700">June 1, 2025</div>
              <div className="text-xs text-purple-500">12 pages</div>
            </div>
          </div>

          <Button onClick={generateBoardReport} className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Generate Board Report Now
          </Button>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">Report Contents</div>
            <div className="text-xs text-blue-600">
              • Executive Summary • Cash Flow Analysis • KPI Performance<br />
              • Risk Assessment • Department Scores • Strategic Recommendations
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElumeluPanel;
