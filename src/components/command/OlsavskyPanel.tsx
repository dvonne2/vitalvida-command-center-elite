
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PermissionGate, useAuth } from "@/components/auth/LoginSystem";
import { TrendingUp, DollarSign, AlertTriangle, Target, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const OlsavskyPanel = () => {
  const { auditLog } = useAuth();
  const [scenarioInput, setScenarioInput] = useState('');

  // Global Financial Performance Data
  const performanceData = [
    { region: 'Lagos', revenue: 3200000, cost: 2100000, margin: 34.4, orders: 450, avgOrderValue: 7111 },
    { region: 'Abuja', revenue: 1800000, cost: 1350000, margin: 25.0, orders: 280, avgOrderValue: 6429 },
    { region: 'Port Harcourt', revenue: 1400000, cost: 980000, margin: 30.0, orders: 210, avgOrderValue: 6667 },
    { region: 'Kano', revenue: 900000, cost: 720000, margin: 20.0, orders: 150, avgOrderValue: 6000 },
    { region: 'Benin', revenue: 750000, cost: 600000, margin: 20.0, orders: 120, avgOrderValue: 6250 }
  ];

  // Product Performance Data
  const productData = [
    { product: 'Vitamin C 1000mg', revenue: 1200000, cost: 720000, margin: 40.0, units: 800 },
    { product: 'Omega 3 Capsules', revenue: 950000, cost: 665000, margin: 30.0, units: 380 },
    { product: 'Multivitamin Tablets', revenue: 800000, cost: 560000, margin: 30.0, units: 320 },
    { product: 'Protein Powder', revenue: 750000, cost: 450000, margin: 40.0, units: 125 },
    { product: 'Calcium Tablets', revenue: 650000, cost: 455000, margin: 30.0, units: 260 }
  ];

  // Scenario Forecast Engine Data
  const scenarioOptions = [
    { scenario: 'DA Returns Delayed 7 Days', impact: -1200000, probability: 'Medium', description: 'Cash flow impact from delayed returns' },
    { scenario: 'Ad Spend Increase 50%', impact: 2400000, probability: 'High', description: 'Revenue boost from increased marketing' },
    { scenario: 'New Region Launch', impact: 1800000, probability: 'Low', description: 'Revenue from new market entry' },
    { scenario: 'Major Refund Wave', impact: -800000, probability: 'Low', description: 'Product quality issue impact' },
    { scenario: 'Supplier Price Increase', impact: -600000, probability: 'High', description: 'Cost increase from inflation' }
  ];

  // Efficiency Leak Detection
  const efficiencyLeaks = [
    { area: 'Abuja DA Cost/Order', current: 900, target: 620, variance: 45.2, impact: 'High' },
    { area: 'Return Processing Time', current: 5.2, target: 3.0, variance: 73.3, impact: 'Medium' },
    { area: 'Inventory Holding Cost', current: 12.5, target: 8.0, variance: 56.3, impact: 'High' },
    { area: 'Customer Acquisition Cost', current: 4800, target: 3500, variance: 37.1, impact: 'Critical' },
    { area: 'Order Fulfillment Time', current: 3.8, target: 2.5, variance: 52.0, impact: 'Medium' }
  ];

  // Capital Allocation Tracker
  const capitalData = [
    { category: 'DA Inventory', amount: 2500000, percentage: 35.7, performance: 'Good', roi: 2.4 },
    { category: 'Moniepoint Float', amount: 1200000, percentage: 17.1, performance: 'Excellent', roi: 3.8 },
    { category: 'Marketing Spend', amount: 1800000, percentage: 25.7, performance: 'Fair', roi: 1.9 },
    { category: 'Operational Cash', amount: 800000, percentage: 11.4, performance: 'Good', roi: 2.1 },
    { category: 'Reserve Fund', amount: 700000, percentage: 10.0, performance: 'Stable', roi: 0.5 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const runScenarioAnalysis = () => {
    auditLog(`Ran scenario analysis: ${scenarioInput}`, 'Olsavsky Panel');
  };

  const optimizeAllocation = () => {
    auditLog('Optimized capital allocation', 'Olsavsky Panel');
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Global Financial Performance Monitor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Global Financial Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    if (name === 'revenue' || name === 'cost') {
                      return [formatCurrency(value), name];
                    }
                    return [value, name];
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" name="revenue" />
                <Bar dataKey="cost" fill="#ef4444" name="cost" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {performanceData.map((region, index) => (
              <div key={index} className="text-center p-3 border rounded-lg">
                <div className="font-medium text-sm">{region.region}</div>
                <div className="text-lg font-bold text-green-600">{region.margin}%</div>
                <div className="text-xs text-gray-500">{region.orders} orders</div>
                <div className="text-xs text-gray-500">{formatCurrency(region.avgOrderValue)} AOV</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario Forecast Engine */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Scenario Forecast Engine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PermissionGate panel="olsavsky" action="edit">
              <div className="mb-4 p-3 border rounded-lg">
                <div className="text-sm font-medium mb-2">Custom Scenario Input</div>
                <Input 
                  value={scenarioInput}
                  onChange={(e) => setScenarioInput(e.target.value)}
                  placeholder="e.g., What if Lagos DA efficiency drops 20%?"
                  className="mb-2"
                />
                <Button size="sm" onClick={runScenarioAnalysis} className="w-full">
                  Run Analysis
                </Button>
              </div>
            </PermissionGate>

            <div className="space-y-3">
              {scenarioOptions.map((scenario, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium">{scenario.scenario}</div>
                    <Badge className={
                      scenario.impact > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }>
                      {scenario.impact > 0 ? '+' : ''}{formatCurrency(scenario.impact)}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{scenario.description}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Probability: {scenario.probability}</span>
                    <PermissionGate panel="olsavsky" action="edit">
                      <Button size="sm" variant="outline" className="text-xs">
                        Analyze
                      </Button>
                    </PermissionGate>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Efficiency Leak Detection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Efficiency Leak Detector
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {efficiencyLeaks.map((leak, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium">{leak.area}</div>
                    <Badge className={
                      leak.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                      leak.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {leak.impact}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Current:</span>
                      <div className="font-bold">{leak.current}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Target:</span>
                      <div className="font-bold text-green-600">{leak.target}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Variance:</span>
                      <div className="font-bold text-red-600">+{leak.variance}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium text-orange-800">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                Efficiency Alert
              </div>
              <div className="text-xs text-orange-600">
                3 critical efficiency gaps detected. Estimated annual impact: ₦24M
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Capital Allocation Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Capital Allocation Tracker
          </CardTitle>
          <PermissionGate panel="olsavsky" action="edit">
            <Button size="sm" onClick={optimizeAllocation}>
              Optimize Allocation
            </Button>
          </PermissionGate>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={capitalData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {capitalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {capitalData.map((allocation, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium">{allocation.category}</div>
                    <Badge className={
                      allocation.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                      allocation.performance === 'Good' ? 'bg-blue-100 text-blue-800' :
                      allocation.performance === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {allocation.performance}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <div className="font-bold">{formatCurrency(allocation.amount)}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Share:</span>
                      <div className="font-bold">{allocation.percentage}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">ROI:</span>
                      <div className="font-bold text-green-600">{allocation.roi}x</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">Capital Efficiency</div>
            <div className="text-xs text-blue-600">
              Total deployed: ₦7M | Weighted average ROI: 2.1x | Recommendation: Increase marketing allocation
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OlsavskyPanel;
