
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, AlertTriangle, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DABreakdown {
  daName: string;
  amount: number;
  flagSource: string;
  actionPath: string;
  daysOverdue: number;
}

const CashExposureMap = () => {
  const { toast } = useToast();
  const [showDABreakdown, setShowDABreakdown] = useState(false);

  // This should sync with the same data source as CriticalAlertsBar
  const exposureData = [
    { source: 'Moniepoint Balance', amount: 2847350, status: 'live', risk: 'low' },
    { source: 'Bank Balance (GT Bank)', amount: 1250000, status: 'verified', risk: 'low' },
    { 
      source: '🚨 Cash Exposure – Policy Violation', 
      amount: 847500, 
      status: 'VIOLATION', 
      risk: 'high',
      isDAViolation: true
    },
    { source: 'Goods with DAs', amount: 1200000, status: 'pending', risk: 'medium' },
    { source: 'Pending Refunds', amount: 125000, status: 'processing', risk: 'medium' },
    { source: 'Unpaid Vendors', amount: 320000, status: 'overdue', risk: 'high' }
  ];

  // DA breakdown data - should sync with receivables audit log
  const daBreakdownData: DABreakdown[] = [
    {
      daName: 'Lagos-3 (Chioma)',
      amount: 347500,
      flagSource: 'Delivered order 101567 - no Moniepoint match',
      actionPath: 'Resolve via Bookkeeping Panel → Daily Receivables',
      daysOverdue: 3
    },
    {
      daName: 'PH-1 (Grace)', 
      amount: 280000,
      flagSource: 'Multiple deliveries - payment reconciliation pending',
      actionPath: 'Resolve via Audit Panel → Escalated Casebook',
      daysOverdue: 7
    },
    {
      daName: 'Abuja-2 (Ibrahim)',
      amount: 125000,
      flagSource: 'Cash collected - not deposited in system',
      actionPath: 'Resolve via Dangote Panel → DA Discipline Matrix',
      daysOverdue: 2
    },
    {
      daName: 'Lagos-1 (Adebayo)',
      amount: 95000,
      flagSource: 'Refund processed - cash trail missing',
      actionPath: 'Resolve via Elumelu Panel → Bank Reconciliation',
      daysOverdue: 5
    }
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

  const getRiskColor = (risk: string, isViolation?: boolean) => {
    if (isViolation) return 'bg-red-100 text-red-800 border-red-500';
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDAViolationClick = () => {
    setShowDABreakdown(true);
    toast({
      title: "DA Cash Exposure Details",
      description: "Showing detailed breakdown of policy violations",
    });
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
                {item.isDAViolation ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDAViolationClick}
                    className="font-bold text-red-700 hover:text-red-900 hover:bg-red-50 p-1"
                  >
                    {formatCurrency(item.amount)}
                    <Eye className="w-3 h-3 ml-1" />
                  </Button>
                ) : (
                  <span className="font-bold">{formatCurrency(item.amount)}</span>
                )}
                <Badge className={`text-xs ${getRiskColor(item.risk, item.isDAViolation)}`}>
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* DA Breakdown Modal/Expansion */}
        {showDABreakdown && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                DA Cash Exposure Breakdown
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDABreakdown(false)}
                className="text-red-600"
              >
                ✕
              </Button>
            </div>
            <div className="space-y-3">
              {daBreakdownData.map((da, index) => (
                <div key={index} className="bg-white p-3 rounded border border-red-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium text-sm">{da.daName}</span>
                      <Badge 
                        variant="destructive" 
                        className="ml-2 text-xs"
                      >
                        {da.daysOverdue}d overdue
                      </Badge>
                    </div>
                    <span className="font-bold text-red-700">
                      {formatCurrency(da.amount)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Flag:</strong> {da.flagSource}
                  </p>
                  <p className="text-xs text-blue-600 cursor-pointer hover:underline">
                    → {da.actionPath}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-red-100 rounded text-xs text-red-800">
              <strong>Policy Alert:</strong> All DA cash exposures must be resolved within 24 hours. 
              Escalate immediately to Finance Controller.
            </div>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-800">Dangote Rule</div>
          <div className="text-xs text-blue-600">Every naira must be tracked. High-risk exposure requires immediate attention.</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashExposureMap;
