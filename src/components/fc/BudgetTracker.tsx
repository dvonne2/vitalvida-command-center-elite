
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BudgetTracker = () => {
  const budgetData = [
    {
      department: 'Marketing',
      budgetMonthly: 1500000,
      spentToDate: 1320000,
      remainingDays: 15,
      projectedSpend: 1450000,
      variance: -50000,
      status: 'on_track'
    },
    {
      department: 'Logistics',
      budgetMonthly: 800000,
      spentToDate: 650000,
      remainingDays: 15,
      projectedSpend: 780000,
      variance: -20000,
      status: 'under_budget'
    },
    {
      department: 'Payroll',
      budgetMonthly: 2200000,
      spentToDate: 1100000,
      remainingDays: 15,
      projectedSpend: 2200000,
      variance: 0,
      status: 'on_track'
    },
    {
      department: 'Inventory',
      budgetMonthly: 3000000,
      spentToDate: 2850000,
      remainingDays: 15,
      projectedSpend: 3400000,
      variance: 400000,
      status: 'over_budget'
    }
  ];

  const weeklyTrends = [
    { week: 'Week 1', marketing: 320000, logistics: 180000, payroll: 550000, inventory: 800000 },
    { week: 'Week 2', marketing: 380000, logistics: 220000, payroll: 550000, inventory: 950000 },
    { week: 'Week 3', marketing: 420000, logistics: 250000, payroll: 0, inventory: 1100000 },
    { week: 'Current', marketing: 200000, logistics: 0, payroll: 0, inventory: 0 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-green-500/20 text-green-400';
      case 'under_budget': return 'bg-blue-500/20 text-blue-400';
      case 'over_budget': return 'bg-red-500/20 text-red-400';
      case 'at_risk': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_track': return <TrendingUp className="w-4 h-4" />;
      case 'under_budget': return <TrendingDown className="w-4 h-4" />;
      case 'over_budget': return <AlertTriangle className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const totalBudget = budgetData.reduce((sum, dept) => sum + dept.budgetMonthly, 0);
  const totalSpent = budgetData.reduce((sum, dept) => sum + dept.spentToDate, 0);
  const totalVariance = budgetData.reduce((sum, dept) => sum + dept.variance, 0);
  const overBudgetDepts = budgetData.filter(dept => dept.status === 'over_budget').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Budget (Month)</p>
                <p className="text-2xl font-bold text-blue-400">{formatCurrency(totalBudget)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Spent to Date</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(totalSpent)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Budget Variance</p>
                <p className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {totalVariance >= 0 ? '+' : ''}{formatCurrency(totalVariance)}
                </p>
              </div>
              {totalVariance >= 0 ? <AlertTriangle className="w-8 h-8 text-red-400" /> : <TrendingDown className="w-8 h-8 text-green-400" />}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Over Budget Depts</p>
                <p className="text-2xl font-bold text-red-400">{overBudgetDepts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Budget Tracker */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <DollarSign className="w-5 h-5" />
            Department Budget vs Actual Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetData.map((dept, index) => (
              <div key={index} className="border border-gray-600 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{dept.department}</h3>
                    <Badge className={`${getStatusColor(dept.status)} flex items-center gap-1`}>
                      {getStatusIcon(dept.status)}
                      {dept.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Variance</p>
                    <p className={`text-xl font-bold ${dept.variance >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {dept.variance >= 0 ? '+' : ''}{formatCurrency(dept.variance)}
                    </p>
                  </div>
                </div>

                {/* Budget Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Budget Progress</span>
                    <span className="text-white">
                      {formatCurrency(dept.spentToDate)} / {formatCurrency(dept.budgetMonthly)}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((dept.spentToDate / dept.budgetMonthly) * 100, 100)} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-400">
                    {((dept.spentToDate / dept.budgetMonthly) * 100).toFixed(1)}% of budget used
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Monthly Budget</p>
                    <p className="font-bold text-blue-400">{formatCurrency(dept.budgetMonthly)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Spent to Date</p>
                    <p className="font-bold text-green-400">{formatCurrency(dept.spentToDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Projected Total</p>
                    <p className={`font-bold ${dept.projectedSpend > dept.budgetMonthly ? 'text-red-400' : 'text-gray-300'}`}>
                      {formatCurrency(dept.projectedSpend)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Days Remaining</p>
                    <p className="font-bold text-yellow-400">{dept.remainingDays} days</p>
                  </div>
                </div>

                {/* Alert for over-budget departments */}
                {dept.status === 'over_budget' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">Budget Breach Alert</span>
                    </div>
                    <p className="text-xs text-red-300 mt-1">
                      Department is projected to exceed budget by {formatCurrency(Math.abs(dept.variance))}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Spending Trends */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">Weekly Spending Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => `₦${(value/1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(value), '']}
                  labelStyle={{ color: '#000' }}
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                />
                <Bar dataKey="marketing" fill="#EF4444" name="Marketing" />
                <Bar dataKey="logistics" fill="#10B981" name="Logistics" />
                <Bar dataKey="payroll" fill="#3B82F6" name="Payroll" />
                <Bar dataKey="inventory" fill="#F59E0B" name="Inventory" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetTracker;
