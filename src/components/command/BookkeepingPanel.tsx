import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PermissionGate, useAuth } from "@/components/auth/LoginSystem";
import { Calculator, Package, DollarSign, AlertTriangle, FileText } from "lucide-react";

const BookkeepingPanel = () => {
  const { auditLog } = useAuth();
  const [reconciliationNote, setReconciliationNote] = useState('');

  // Bookkeeping Accuracy Score Data
  const accuracyMetrics = [
    { metric: 'Entry Match Rate', score: 98.2, target: 99.0, status: 'good' },
    { metric: 'Categorization Accuracy', score: 95.8, target: 98.0, status: 'needs-improvement' },
    { metric: 'Receipt Attachment Rate', score: 92.1, target: 95.0, status: 'needs-improvement' },
    { metric: 'Duplicate Detection', score: 99.5, target: 99.0, status: 'excellent' },
    { metric: 'Auto vs Manual Ratio', score: 87.3, target: 90.0, status: 'needs-improvement' }
  ];

  // Bin-to-Cash Reconciliation Data
  const daReconciliation = [
    { 
      da: 'Lagos-1 (Adebayo)', 
      stockValue: 250000, 
      cashReceived: 185000, 
      pendingPayments: 45000, 
      variance: 20000, 
      status: 'minor-gap',
      lastUpdate: '2 hours ago'
    },
    { 
      da: 'Lagos-3 (Chioma)', 
      stockValue: 320000, 
      cashReceived: 255000, 
      pendingPayments: 10000, 
      variance: 55000, 
      status: 'major-gap',
      lastUpdate: '6 hours ago'
    },
    { 
      da: 'Abuja-2 (Ibrahim)', 
      stockValue: 180000, 
      cashReceived: 175000, 
      pendingPayments: 8000, 
      variance: -3000, 
      status: 'reconciled',
      lastUpdate: '1 hour ago'
    },
    { 
      da: 'PH-1 (Grace)', 
      stockValue: 275000, 
      cashReceived: 201000, 
      pendingPayments: 62000, 
      variance: 12000, 
      status: 'minor-gap',
      lastUpdate: '4 hours ago'
    }
  ];

  // Daily Receivables Tracker
  const receivablesData = [
    { da: 'Lagos-1', packagesDelivered: 12, packagesPaid: 10, unpaidValue: 15000, daysOverdue: 2 },
    { da: 'Lagos-3', packagesDelivered: 18, packagesPaid: 14, unpaidValue: 32000, daysOverdue: 5 },
    { da: 'Abuja-2', packagesDelivered: 8, packagesPaid: 8, unpaidValue: 0, daysOverdue: 0 },
    { da: 'PH-1', packagesDelivered: 15, packagesPaid: 11, unpaidValue: 28000, daysOverdue: 3 },
    { da: 'Kano-1', packagesDelivered: 6, packagesPaid: 5, unpaidValue: 8500, daysOverdue: 1 }
  ];

  // Exception Alert Feed
  const exceptions = [
    { 
      type: 'high-value-refund', 
      description: '₦72k refund raised manually – no linked order', 
      value: 72000, 
      timestamp: '2 hours ago',
      severity: 'critical',
      requiresApproval: true
    },
    { 
      type: 'manual-entry', 
      description: 'Payment entry without Moniepoint verification', 
      value: 45000, 
      timestamp: '4 hours ago',
      severity: 'high',
      requiresApproval: true
    },
    { 
      type: 'inventory-mismatch', 
      description: 'Stock dispatch without DA acknowledgment', 
      value: 28000, 
      timestamp: '6 hours ago',
      severity: 'medium',
      requiresApproval: false
    },
    { 
      type: 'late-return', 
      description: 'DA return logged 7 days after delivery failure', 
      value: 18500, 
      timestamp: '1 day ago',
      severity: 'medium',
      requiresApproval: false
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

  const getScoreColor = (score: number, target: number) => {
    if (score >= target) return 'text-green-600 bg-green-100';
    if (score >= target - 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) <= 5000) return 'text-green-600';
    if (Math.abs(variance) <= 25000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleReconciliation = (da: string) => {
    auditLog(`Initiated reconciliation for ${da}`, 'Bookkeeping Panel');
  };

  const handleExceptionApproval = (exceptionId: string, action: string) => {
    auditLog(`${action} exception: ${exceptionId}`, 'Bookkeeping Panel');
  };

  const averageAccuracy = accuracyMetrics.reduce((sum, metric) => sum + metric.score, 0) / accuracyMetrics.length;

  return (
    <div className="space-y-6">
      {/* Bookkeeping Accuracy Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Bookkeeping Accuracy Score
          </CardTitle>
          <div className="text-2xl font-bold text-blue-600">
            {averageAccuracy.toFixed(1)}%
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accuracyMetrics.map((metric, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-2">{metric.metric}</div>
                <div className="flex justify-between items-center mb-1">
                  <Badge className={getScoreColor(metric.score, metric.target)}>
                    {metric.score}%
                  </Badge>
                  <span className="text-xs text-gray-500">Target: {metric.target}%</span>
                </div>
                <div className="text-xs text-gray-600">{metric.status.replace('-', ' ')}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">Weekly Improvement Target</div>
            <div className="text-xs text-blue-600">
              Focus areas: Receipt attachment (+2.9%) and categorization accuracy (+2.2%)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bin-to-Cash Reconciliation Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Bin-to-Cash Reconciliation Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">DA Agent</th>
                  <th className="text-center p-3 font-medium">Stock Value</th>
                  <th className="text-center p-3 font-medium">Cash Received</th>
                  <th className="text-center p-3 font-medium">Pending</th>
                  <th className="text-center p-3 font-medium">Variance</th>
                  <th className="text-center p-3 font-medium">Status</th>
                  <th className="text-center p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {daReconciliation.map((da, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium text-sm">{da.da}</div>
                      <div className="text-xs text-gray-500">Updated {da.lastUpdate}</div>
                    </td>
                    <td className="text-center p-3 font-mono text-sm">{formatCurrency(da.stockValue)}</td>
                    <td className="text-center p-3 font-mono text-sm">{formatCurrency(da.cashReceived)}</td>
                    <td className="text-center p-3 font-mono text-sm">{formatCurrency(da.pendingPayments)}</td>
                    <td className="text-center p-3">
                      <span className={`font-mono text-sm font-bold ${getVarianceColor(da.variance)}`}>
                        {da.variance > 0 ? '+' : ''}{formatCurrency(da.variance)}
                      </span>
                    </td>
                    <td className="text-center p-3">
                      <Badge className={
                        da.status === 'reconciled' ? 'bg-green-100 text-green-800' :
                        da.status === 'minor-gap' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {da.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <PermissionGate 
                        panel="bookkeeping" 
                        action="edit"
                        fallback={<span className="text-xs text-gray-500">View Only</span>}
                      >
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs"
                          disabled={da.status === 'reconciled'}
                          onClick={() => handleReconciliation(da.da)}
                        >
                          Reconcile
                        </Button>
                      </PermissionGate>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PermissionGate panel="bookkeeping" action="edit">
            <div className="mt-4 p-3 border rounded-lg">
              <div className="text-sm font-medium mb-2">Reconciliation Notes</div>
              <Input 
                value={reconciliationNote}
                onChange={(e) => setReconciliationNote(e.target.value)}
                placeholder="Enter reconciliation notes..."
                className="mb-2"
              />
              <Button size="sm" className="w-full">Save Note</Button>
            </div>
          </PermissionGate>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Receivables Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Daily Receivables Tracker by DA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {receivablesData.map((da, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-sm">{da.da}</div>
                    <Badge className={da.unpaidValue === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {da.unpaidValue === 0 ? 'Clear' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Delivered:</span>
                      <div className="font-bold">{da.packagesDelivered}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Paid:</span>
                      <div className="font-bold text-green-600">{da.packagesPaid}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Unpaid Value:</span>
                      <div className="font-bold text-red-600">{formatCurrency(da.unpaidValue)}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Days Overdue:</span>
                      <div className={`font-bold ${da.daysOverdue > 3 ? 'text-red-600' : 'text-gray-700'}`}>
                        {da.daysOverdue}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium text-yellow-800">Collection Alert</div>
              <div className="text-xs text-yellow-600">
                Total outstanding: ₦83,500 across 4 DAs. Lagos-3 requires immediate follow-up.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exception Alert Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Exception Alert Feed (&gt;₦50k)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exceptions.map((exception, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm font-medium">{exception.description}</div>
                      <div className="text-xs text-gray-500">{exception.timestamp}</div>
                    </div>
                    <Badge className={
                      exception.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      exception.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {exception.severity}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-red-600">{formatCurrency(exception.value)}</span>
                    {exception.requiresApproval && (
                      <PermissionGate 
                        panel="bookkeeping" 
                        action="edit"
                        fallback={<span className="text-xs text-gray-400">FC Approval Required</span>}
                      >
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs text-green-600"
                            onClick={() => handleExceptionApproval(exception.type, 'Approved')}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs text-red-600"
                            onClick={() => handleExceptionApproval(exception.type, 'Rejected')}
                          >
                            Reject
                          </Button>
                        </div>
                      </PermissionGate>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <div className="text-sm font-medium text-red-800">High-Value Alert</div>
              <div className="text-xs text-red-600">
                2 exceptions require immediate FC approval. Total exposure: ₦117,000
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Transaction Integrity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Inventory Transaction Integrity Log (Immutable)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <div className="text-xs font-mono p-2 border rounded bg-gray-50">
              [2025-06-06 14:32:15] FC_USER | INVENTORY_RETURN | Lagos-3 | SKU:VV-012 | QTY:5 | VALUE:₦25,000 | REASON:Customer_Return | PHOTO:IMG_001.jpg
            </div>
            <div className="text-xs font-mono p-2 border rounded bg-gray-50">
              [2025-06-06 14:28:43] FC_USER | STOCK_DISPATCH | Abuja-2 | SKU:VV-045 | QTY:12 | VALUE:₦48,000 | REASON:New_Order | ORDER_ID:ORD_2891
            </div>
            <div className="text-xs font-mono p-2 border rounded bg-gray-50">
              [2025-06-06 14:15:22] SYSTEM | PAYMENT_MATCH | Lagos-1 | ORDER:ORD_2890 | AMOUNT:₦15,500 | MONIEPOINT_REF:MP_789456 | AUTO_VERIFIED
            </div>
            <div className="text-xs font-mono p-2 border rounded bg-red-50">
              [2025-06-06 14:02:11] FC_USER | MANUAL_REFUND | PH-1 | ORDER:ORD_2887 | AMOUNT:₦72,000 | REASON:Quality_Issue | ⚠️ NO_RETURN_LOG
            </div>
            <div className="text-xs font-mono p-2 border rounded bg-gray-50">
              [2025-06-06 13:45:33] SYSTEM | STOCK_ALERT | Multiple | THRESHOLD_BREACH | SKU:VV-023 | STOCK_LEVEL:5 | MIN_THRESHOLD:10
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">Integrity Rules</div>
            <div className="text-xs text-blue-600">
              • All entries timestamped and immutable • Manual entries require justification<br />
              • Red flags auto-generated for exceptions • System logs cannot be deleted
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookkeepingPanel;
