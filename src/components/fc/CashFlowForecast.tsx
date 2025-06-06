
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CashFlowForecast = () => {
  const forecastData = [
    { day: 'Today', date: '16 Jan', inflow: 450000, outflow: 320000, netFlow: 130000, cumulative: 2850000 },
    { day: 'Day 2', date: '17 Jan', inflow: 520000, outflow: 280000, netFlow: 240000, cumulative: 3090000 },
    { day: 'Day 3', date: '18 Jan', inflow: 380000, outflow: 450000, netFlow: -70000, cumulative: 3020000 },
    { day: 'Day 4', date: '19 Jan', inflow: 600000, outflow: 350000, netFlow: 250000, cumulative: 3270000 },
    { day: 'Day 5', date: '20 Jan', inflow: 480000, outflow: 620000, netFlow: -140000, cumulative: 3130000 },
    { day: 'Day 6', date: '21 Jan', inflow: 720000, outflow: 400000, netFlow: 320000, cumulative: 3450000 },
    { day: 'Day 7', date: '22 Jan', inflow: 580000, outflow: 380000, netFlow: 200000, cumulative: 3650000 },
    { day: 'Week 2', date: '23-29 Jan', inflow: 3200000, outflow: 2800000, netFlow: 400000, cumulative: 4050000 },
    { day: 'Week 3', date: '30 Jan-5 Feb', inflow: 3400000, outflow: 3100000, netFlow: 300000, cumulative: 4350000 },
    { day: 'Week 4', date: '6-12 Feb', inflow: 3600000, outflow: 3200000, netFlow: 400000, cumulative: 4750000 }
  ];

  const cashComponents = {
    currentBank: 2850000,
    expectedMoniepoint: 3200000,
    bonusLiability: 485000,
    payrollCommitted: 720000,
    inventoryRestock: 1200000,
    adSpend: 450000
  };

  const riskFactors = [
    { factor: 'DA Payment Delay Risk', probability: 25, impact: -200000, severity: 'medium' },
    { factor: 'Refund Spike Risk', probability: 15, impact: -150000, severity: 'low' },
    { factor: 'Ad CPL Increase', probability: 40, impact: -300000, severity: 'high' },
    { factor: 'Naira Depreciation', probability: 30, impact: -180000, severity: 'medium' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Current Cash Position</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(cashComponents.currentBank)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">14-Day Projection</p>
                <p className="text-2xl font-bold text-blue-400">{formatCurrency(forecastData[6].cumulative)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Bonus Risk</p>
                <p className="text-2xl font-bold text-orange-400">{formatCurrency(cashComponents.bonusLiability)}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Net Flow (7 Days)</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {formatCurrency(forecastData.slice(0, 7).reduce((sum, day) => sum + day.netFlow, 0))}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <TrendingUp className="w-5 h-5" />
            14-Day Rolling Cash Flow Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData.slice(0, 7)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => `₦${(value/1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(value), '']}
                  labelStyle={{ color: '#000' }}
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                />
                <Line type="monotone" dataKey="inflow" stroke="#10B981" strokeWidth={2} name="Inflow" />
                <Line type="monotone" dataKey="outflow" stroke="#EF4444" strokeWidth={2} name="Outflow" />
                <Line type="monotone" dataKey="cumulative" stroke="#F59E0B" strokeWidth={3} name="Cumulative" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Components Breakdown */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Cash Components Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                <span className="text-green-400">Current Bank Balance</span>
                <span className="font-bold text-green-400">{formatCurrency(cashComponents.currentBank)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded">
                <span className="text-blue-400">Expected Moniepoint (7 days)</span>
                <span className="font-bold text-blue-400">+{formatCurrency(cashComponents.expectedMoniepoint)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                <span className="text-red-400">Bonus Liability</span>
                <span className="font-bold text-red-400">-{formatCurrency(cashComponents.bonusLiability)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                <span className="text-red-400">Payroll Committed</span>
                <span className="font-bold text-red-400">-{formatCurrency(cashComponents.payrollCommitted)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded">
                <span className="text-purple-400">Inventory Restock</span>
                <span className="font-bold text-purple-400">-{formatCurrency(cashComponents.inventoryRestock)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded">
                <span className="text-orange-400">Ad Spend Budget</span>
                <span className="font-bold text-orange-400">-{formatCurrency(cashComponents.adSpend)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Factors */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Risk-Adjusted Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((risk, index) => (
                <div key={index} className="border border-gray-600 rounded p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-white">{risk.factor}</span>
                    <Badge className={getSeverityColor(risk.severity)}>
                      {risk.severity}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Probability</p>
                      <p className="text-yellow-400 font-bold">{risk.probability}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Impact</p>
                      <p className="text-red-400 font-bold">{formatCurrency(risk.impact)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
              <div className="text-sm font-medium text-yellow-400">Cash Buffer Recommendation</div>
              <div className="text-xs text-yellow-300 mt-1">
                Maintain minimum ₦800k buffer for risk mitigation. Current 14-day projection suggests adequate coverage.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashFlowForecast;
