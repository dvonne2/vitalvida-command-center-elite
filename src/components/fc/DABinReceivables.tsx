
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, AlertTriangle, Clock, DollarSign } from "lucide-react";

interface DABinReceivablesProps {
  canEdit: boolean;
}

const DABinReceivables = ({ canEdit }: DABinReceivablesProps) => {
  const binData = [
    {
      daName: 'Lagos-1 (Adebayo)',
      binId: 'LG1-001',
      skus: [
        { name: 'Vitamin C 1000mg', qty: 15, cost: 1500, total: 22500 },
        { name: 'Omega 3 Fish Oil', qty: 8, cost: 2500, total: 20000 }
      ],
      totalValue: 42500,
      lastDispatch: '2024-01-15',
      lastPayment: '2024-01-14',
      daysIdle: 2,
      status: 'clear',
      paymentsReceived: 38000,
      outstanding: 4500
    },
    {
      daName: 'Lagos-3 (Chioma)',
      binId: 'LG3-001',
      skus: [
        { name: 'Multivitamin Complex', qty: 25, cost: 3000, total: 75000 },
        { name: 'Protein Powder', qty: 12, cost: 15000, total: 180000 },
        { name: 'Calcium Tablets', qty: 20, cost: 1200, total: 24000 }
      ],
      totalValue: 279000,
      lastDispatch: '2024-01-10',
      lastPayment: '2024-01-08',
      daysIdle: 7,
      status: 'blocked',
      paymentsReceived: 125000,
      outstanding: 154000
    },
    {
      daName: 'Abuja-2 (Ibrahim)',
      binId: 'AB2-001',
      skus: [
        { name: 'Iron Supplements', qty: 10, cost: 1800, total: 18000 },
        { name: 'Vitamin D3', qty: 6, cost: 2200, total: 13200 }
      ],
      totalValue: 31200,
      lastDispatch: '2024-01-16',
      lastPayment: '2024-01-16',
      daysIdle: 1,
      status: 'clear',
      paymentsReceived: 31200,
      outstanding: 0
    }
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
      case 'clear': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'idle': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'blocked': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clear': return '🟢';
      case 'idle': return '🟡';
      case 'blocked': return '🔴';
      default: return '⚪';
    }
  };

  const totalOutstanding = binData.reduce((sum, bin) => sum + bin.outstanding, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Outstanding</p>
                <p className="text-2xl font-bold text-yellow-400">{formatCurrency(totalOutstanding)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Blocked Bins</p>
                <p className="text-2xl font-bold text-red-400">{binData.filter(b => b.status === 'blocked').length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Idle &gt; 5 Days</p>
                <p className="text-2xl font-bold text-orange-400">{binData.filter(b => b.daysIdle > 5).length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Bins</p>
                <p className="text-2xl font-bold text-green-400">{binData.length}</p>
              </div>
              <Package className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DA Bin Details */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Package className="w-5 h-5" />
            DA Bin Receivables Ledger (Virtual A/R System)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {binData.map((bin, index) => (
              <div key={index} className="border border-gray-600 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{bin.daName}</h3>
                    <p className="text-sm text-gray-400">Bin ID: {bin.binId}</p>
                  </div>
                  <Badge className={getStatusColor(bin.status)}>
                    {getStatusIcon(bin.status)} {bin.status.toUpperCase()}
                  </Badge>
                </div>

                {/* SKU Breakdown */}
                <div className="bg-gray-900 rounded p-3">
                  <h4 className="font-medium text-yellow-400 mb-2">Stock Details</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left p-2 text-gray-400">SKU</th>
                          <th className="text-center p-2 text-gray-400">Qty</th>
                          <th className="text-center p-2 text-gray-400">Unit Cost</th>
                          <th className="text-center p-2 text-gray-400">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bin.skus.map((sku, skuIndex) => (
                          <tr key={skuIndex} className="border-b border-gray-700">
                            <td className="p-2 text-white">{sku.name}</td>
                            <td className="text-center p-2 text-gray-300">{sku.qty}</td>
                            <td className="text-center p-2 text-gray-300">{formatCurrency(sku.cost)}</td>
                            <td className="text-center p-2 font-medium text-yellow-400">{formatCurrency(sku.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Total Value</p>
                    <p className="font-bold text-white">{formatCurrency(bin.totalValue)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Payments Received</p>
                    <p className="font-bold text-green-400">{formatCurrency(bin.paymentsReceived)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Outstanding</p>
                    <p className={`font-bold ${bin.outstanding > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {formatCurrency(bin.outstanding)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Days Idle</p>
                    <p className={`font-bold ${bin.daysIdle > 5 ? 'text-red-400' : 'text-gray-300'}`}>
                      {bin.daysIdle} days
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {canEdit && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      disabled={bin.status === 'clear'}
                      className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                    >
                      Clear Outstanding
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      disabled={bin.status === 'blocked'}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Block New Dispatch
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <div className="text-sm font-medium text-orange-400">Auto-Block Rules</div>
            <div className="text-xs text-orange-300 mt-1">
              • Bins with &gt;₦300k value = auto-blocked from new dispatch<br />
              • Bins idle &gt;5 days = flagged for FC review<br />
              • Outstanding balance &gt;₦150k = bonus eligibility suspended
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DABinReceivables;
