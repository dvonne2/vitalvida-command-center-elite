
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, AlertTriangle } from "lucide-react";

const CashExposureMap = () => {
  const exposureData = [
    { source: 'Moniepoint Balance', amount: 2847350, status: 'live', risk: 'low' },
    { source: 'Bank Balance (GT Bank)', amount: 1250000, status: 'verified', risk: 'low' },
    { source: 'Cash with DAs', amount: 847500, status: 'unverified', risk: 'high' },
    { source: 'Goods with DAs', amount: 1200000, status: 'pending', risk: 'medium' },
    { source: 'Pending Refunds', amount: 125000, status: 'processing', risk: 'medium' },
    { source: 'Unpaid Vendors', amount: 320000, status: 'overdue', risk: 'high' }
  ];

  const totalExposure = exposureData.reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Cash Exposure Map
        </CardTitle>
        <div className="text-2xl font-bold text-blue-600">
          {formatCurrency(totalExposure)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {exposureData.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-medium text-sm">{item.source}</span>
                {item.risk === 'high' && <AlertTriangle className="w-4 h-4 text-red-500" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{formatCurrency(item.amount)}</span>
                <Badge className={`text-xs ${getRiskColor(item.risk)}`}>
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-800">Dangote Rule</div>
          <div className="text-xs text-blue-600">Every naira must be tracked. High-risk exposure requires immediate attention.</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashExposureMap;
