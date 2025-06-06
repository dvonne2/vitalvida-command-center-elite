
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle } from "lucide-react";

const UnsellableStockTracker = () => {
  const stockData = [
    { sku: 'VV-001', product: 'Vitamin C 1000mg', status: 'expired', quantity: 45, value: 67500, daysStuck: 15 },
    { sku: 'VV-012', product: 'Omega 3 Capsules', status: 'returned', quantity: 12, value: 24000, daysStuck: 8 },
    { sku: 'VV-023', product: 'Multivitamin Tablets', status: 'broken', quantity: 8, value: 16000, daysStuck: 5 },
    { sku: 'VV-034', product: 'Protein Powder', status: 'with_da', quantity: 6, value: 36000, daysStuck: 22 },
    { sku: 'VV-045', product: 'Calcium Tablets', status: 'obsolete', quantity: 30, value: 22500, daysStuck: 45 }
  ];

  const totalValue = stockData.reduce((sum, item) => sum + item.value, 0);

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
      case 'expired': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-yellow-100 text-yellow-800';
      case 'broken': return 'bg-orange-100 text-orange-800';
      case 'with_da': return 'bg-blue-100 text-blue-800';
      case 'obsolete': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'expired': return 'Expired';
      case 'returned': return 'Returned';
      case 'broken': return 'Damaged';
      case 'with_da': return 'With DA';
      case 'obsolete': return 'Obsolete';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Unsellable Stock Tracker
        </CardTitle>
        <div className="text-2xl font-bold text-orange-600">
          {formatCurrency(totalValue)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stockData.map((item, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium text-sm">{item.product}</div>
                  <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {getStatusLabel(item.status)}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Qty: {item.quantity}</span>
                <span className="font-bold">{formatCurrency(item.value)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <AlertTriangle className="w-3 h-3" />
                Stuck for {item.daysStuck} days
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
          <div className="text-sm font-medium text-orange-800">Recovery Action Required</div>
          <div className="text-xs text-orange-600">
            Items with DAs &gt;14 days require immediate return. Expired items need disposal authorization.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnsellableStockTracker;
