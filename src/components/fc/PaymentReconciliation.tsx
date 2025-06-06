
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

interface PaymentReconciliationProps {
  canEdit: boolean;
}

const PaymentReconciliation = ({ canEdit }: PaymentReconciliationProps) => {
  const reconciliationData = [
    {
      orderId: 'VV-2024-001',
      customerPhone: '+234801234567',
      daName: 'Lagos-1 (Adebayo)',
      orderAmount: 15000,
      deliveryStatus: 'delivered',
      otpEntered: true,
      otpTime: '2024-01-16 14:30:00',
      paymentReceived: true,
      paymentTime: '2024-01-16 14:35:00',
      paymentAmount: 15000,
      status: 'matched',
      riskFlag: 'none'
    },
    {
      orderId: 'VV-2024-002',
      customerPhone: '+234802345678',
      daName: 'Lagos-3 (Chioma)',
      orderAmount: 25000,
      deliveryStatus: 'delivered',
      otpEntered: true,
      otpTime: '2024-01-16 10:15:00',
      paymentReceived: false,
      paymentTime: null,
      paymentAmount: 0,
      status: 'unpaid_delivery',
      riskFlag: 'high'
    },
    {
      orderId: 'VV-2024-003',
      customerPhone: '+234803456789',
      daName: 'Abuja-2 (Ibrahim)',
      orderAmount: 18000,
      deliveryStatus: 'delivered',
      otpEntered: true,
      otpTime: '2024-01-16 09:45:00',
      paymentReceived: true,
      paymentTime: '2024-01-16 09:30:00',
      paymentAmount: 18000,
      status: 'fraud_risk',
      riskFlag: 'critical'
    },
    {
      orderId: 'VV-2024-004',
      customerPhone: '+234804567890',
      daName: 'PH-1 (Grace)',
      orderAmount: 22000,
      deliveryStatus: 'pending',
      otpEntered: false,
      otpTime: null,
      paymentReceived: true,
      paymentTime: '2024-01-16 16:20:00',
      paymentAmount: 22000,
      status: 'payment_no_delivery',
      riskFlag: 'medium'
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
      case 'matched': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'unpaid_delivery': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'fraud_risk': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'payment_no_delivery': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'none': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'critical': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched': return <CheckCircle className="w-4 h-4" />;
      case 'unpaid_delivery': return <XCircle className="w-4 h-4" />;
      case 'fraud_risk': return <AlertTriangle className="w-4 h-4" />;
      case 'payment_no_delivery': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const matchedOrders = reconciliationData.filter(r => r.status === 'matched').length;
  const unpaidDeliveries = reconciliationData.filter(r => r.status === 'unpaid_delivery').length;
  const fraudRisks = reconciliationData.filter(r => r.riskFlag === 'critical').length;
  const totalPaymentsReceived = reconciliationData.reduce((sum, r) => sum + r.paymentAmount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Matched Orders</p>
                <p className="text-2xl font-bold text-green-400">{matchedOrders}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Unpaid Deliveries</p>
                <p className="text-2xl font-bold text-red-400">{unpaidDeliveries}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Fraud Risks</p>
                <p className="text-2xl font-bold text-purple-400">{fraudRisks}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Payments Today</p>
                <p className="text-2xl font-bold text-yellow-400">{formatCurrency(totalPaymentsReceived)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Moniepoint Reconciliation Panel */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <DollarSign className="w-5 h-5" />
            Moniepoint Payment Reconciliation Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-3 font-medium text-gray-400">Order ID</th>
                  <th className="text-left p-3 font-medium text-gray-400">DA</th>
                  <th className="text-center p-3 font-medium text-gray-400">Amount</th>
                  <th className="text-center p-3 font-medium text-gray-400">Delivery</th>
                  <th className="text-center p-3 font-medium text-gray-400">OTP</th>
                  <th className="text-center p-3 font-medium text-gray-400">Payment</th>
                  <th className="text-center p-3 font-medium text-gray-400">Status</th>
                  <th className="text-center p-3 font-medium text-gray-400">Risk</th>
                  <th className="text-center p-3 font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {reconciliationData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="p-3">
                      <div>
                        <div className="font-medium text-white">{item.orderId}</div>
                        <div className="text-xs text-gray-400">{item.customerPhone}</div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-300">{item.daName}</td>
                    <td className="text-center p-3 font-mono text-yellow-400">{formatCurrency(item.orderAmount)}</td>
                    <td className="text-center p-3">
                      <Badge variant={item.deliveryStatus === 'delivered' ? 'default' : 'secondary'}>
                        {item.deliveryStatus}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      {item.otpEntered ? (
                        <div>
                          <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                          <div className="text-xs text-gray-400">{item.otpTime?.split(' ')[1]}</div>
                        </div>
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-3">
                      {item.paymentReceived ? (
                        <div>
                          <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                          <div className="text-xs text-gray-400">{item.paymentTime?.split(' ')[1]}</div>
                          <div className="text-xs text-yellow-400">{formatCurrency(item.paymentAmount)}</div>
                        </div>
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-3">
                      <Badge className={`${getStatusColor(item.status)} flex items-center gap-1 justify-center`}>
                        {getStatusIcon(item.status)}
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge className={getRiskColor(item.riskFlag)}>
                        {item.riskFlag}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      {canEdit && item.status !== 'matched' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                        >
                          Investigate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="text-sm font-medium text-red-400">Auto-Flag Rules</div>
            <div className="text-xs text-red-300 mt-1">
              • OTP entered before payment = FRAUD RISK (auto-flag critical)<br />
              • Delivery without payment &gt;2 hours = auto-reassign order<br />
              • Payment without delivery = workflow error (auto-flag medium)<br />
              • Manual override attempts = system alert to FC
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentReconciliation;
