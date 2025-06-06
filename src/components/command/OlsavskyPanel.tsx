
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissionGate, useAuth } from "@/components/auth/LoginSystem";
import { DollarSign, TrendingUp, AlertTriangle, BarChart, FileText, Calculator } from "lucide-react";
import FinancialReportsTable from "@/components/FinancialReportsTable";

const OlsavskyPanel = () => {
  const { auditLog } = useAuth();
  
  // Financial Performance Data
  const performanceMetrics = [
    { metric: 'Monthly Revenue', value: '₦8,450,000', change: '+12.5%', trend: 'up' },
    { metric: 'Gross Margin', value: '42.8%', change: '+2.3%', trend: 'up' },
    { metric: 'Operating Expenses', value: '₦2,890,000', change: '-5.1%', trend: 'down' },
    { metric: 'Net Profit Margin', value: '15.2%', change: '+4.1%', trend: 'up' },
    { metric: 'Cash Flow (Monthly)', value: '₦1,250,000', change: '+8.7%', trend: 'up' },
    { metric: 'EBITDA', value: '₦1,890,000', change: '+15.3%', trend: 'up' }
  ];

  // Scenario Forecasts
  const scenarios = [
    {
      name: 'Conservative Growth',
      revenue: '₦9.2M',
      margin: '40%',
      cashFlow: '₦1.1M',
      probability: '75%'
    },
    {
      name: 'Aggressive Expansion', 
      revenue: '₦12.8M',
      margin: '38%',
      cashFlow: '₦1.8M',
      probability: '35%'
    },
    {
      name: 'Market Downturn',
      revenue: '₦6.9M', 
      margin: '45%',
      cashFlow: '₦800K',
      probability: '20%'
    }
  ];

  // Efficiency Leaks
  const efficiencyLeaks = [
    { area: 'DA Bonus Overpayments', impact: '₦45,000', severity: 'medium', trend: 'increasing' },
    { area: 'Inventory Spoilage', impact: '₦125,000', severity: 'high', trend: 'stable' },
    { area: 'Payment Processing Fees', impact: '₦32,000', severity: 'low', trend: 'decreasing' },
    { area: 'Delivery Route Inefficiency', impact: '₦78,000', severity: 'medium', trend: 'increasing' },
    { area: 'Supplier Payment Delays', impact: '₦156,000', severity: 'high', trend: 'stable' }
  ];

  // Capital Allocation
  const capitalAllocations = [
    { category: 'Inventory Investment', allocated: '₦2.5M', utilized: '85%', roi: '23%' },
    { category: 'Marketing & Ads', allocated: '₦800K', utilized: '92%', roi: '18%' },
    { category: 'Technology/Systems', allocated: '₦400K', utilized: '67%', roi: '35%' },
    { category: 'DA Network Expansion', allocated: '₦600K', utilized: '78%', roi: '28%' },
    { category: 'Working Capital Reserve', allocated: '₦1.2M', utilized: '34%', roi: 'N/A' }
  ];

  const handleMetricDrilldown = (metric: string) => {
    auditLog(`CFO Panel: Drilled down into ${metric}`, 'Olsavsky Panel');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance Monitor</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Forecasts</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Leaks</TabsTrigger>
          <TabsTrigger value="capital">Capital Allocation</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Global Financial Performance Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index} className="border cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4" onClick={() => handleMetricDrilldown(metric.metric)}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-600">{metric.metric}</span>
                        <Badge className={`text-xs ${
                          metric.trend === 'up' ? 'bg-green-100 text-green-800' : 
                          metric.trend === 'down' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {metric.change}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Scenario Forecast Engine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {scenarios.map((scenario, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{scenario.name}</h4>
                        <Badge className={`text-xs ${
                          parseFloat(scenario.probability) > 50 ? 'bg-green-100 text-green-800' :
                          parseFloat(scenario.probability) > 30 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {scenario.probability}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Revenue:</span>
                          <span className="font-medium">{scenario.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Margin:</span>
                          <span className="font-medium">{scenario.margin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cash Flow:</span>
                          <span className="font-medium">{scenario.cashFlow}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Efficiency Leak Detector
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PermissionGate panel="olsavsky" action="view">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Leak Area</th>
                        <th className="text-center p-3 font-medium">Monthly Impact</th>
                        <th className="text-center p-3 font-medium">Severity</th>
                        <th className="text-center p-3 font-medium">Trend</th>
                        <th className="text-center p-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {efficiencyLeaks.map((leak, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{leak.area}</td>
                          <td className="text-center p-3 font-mono">{leak.impact}</td>
                          <td className="text-center p-3">
                            <Badge className={`text-xs ${
                              leak.severity === 'high' ? 'bg-red-100 text-red-800' :
                              leak.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {leak.severity}
                            </Badge>
                          </td>
                          <td className="text-center p-3">
                            <span className={`text-xs ${
                              leak.trend === 'increasing' ? 'text-red-600' :
                              leak.trend === 'decreasing' ? 'text-green-600' :
                              'text-gray-600'
                            }`}>
                              {leak.trend}
                            </span>
                          </td>
                          <td className="text-center p-3">
                            <PermissionGate 
                              panel="olsavsky" 
                              action="edit"
                              fallback={<span className="text-xs text-gray-500">View Only</span>}
                            >
                              <Button size="sm" variant="outline" className="text-xs">
                                Investigate
                              </Button>
                            </PermissionGate>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PermissionGate>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Capital Allocation Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capitalAllocations.map((allocation, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{allocation.category}</div>
                      <div className="text-sm text-gray-600">
                        Allocated: {allocation.allocated} | Utilized: {allocation.utilized}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        ROI: {allocation.roi}
                      </div>
                      <div className="text-xs text-gray-500">
                        Utilization: {allocation.utilized}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <FinancialReportsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OlsavskyPanel;
