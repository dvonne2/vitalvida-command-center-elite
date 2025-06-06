
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock } from "lucide-react";

const UnrecoveredValueDashboard = () => {
  const unrecoveredItems = [
    { category: 'Goods Not Returned', amount: 340000, count: 12, daysOverdue: 15 },
    { category: 'Refunds Not Reimbursed', amount: 125000, count: 8, daysOverdue: 22 },
    { category: 'Expired Inventory', amount: 85000, count: 45, daysOverdue: 7 },
    { category: 'Damaged Goods', amount: 67500, count: 15, daysOverdue: 12 },
    { category: 'Vendor Debts', amount: 240000, count: 5, daysOverdue: 30 },
    { category: 'Bonus Overpayments', amount: 45000, count: 3, daysOverdue: 45 }
  ];

  const totalUnrecovered = unrecoveredItems.reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getUrgencyColor = (days: number) => {
    if (days > 30) return 'bg-red-100 text-red-800';
    if (days > 14) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Unrecovered Value Dashboard
        </CardTitle>
        <div className="text-2xl font-bold text-red-600">
          {formatCurrency(totalUnrecovered)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {unrecoveredItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
              <div>
                <div className="font-medium text-sm">{item.category}</div>
                <div className="text-xs text-gray-500">{item.count} items</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{formatCurrency(item.amount)}</div>
                <Badge className={`text-xs ${getUrgencyColor(item.daysOverdue)}`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {item.daysOverdue}d overdue
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <div className="text-sm font-medium text-red-800">Recovery Priority</div>
          <div className="text-xs text-red-600">Items over 30 days require immediate escalation. No exceptions.</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnrecoveredValueDashboard;
