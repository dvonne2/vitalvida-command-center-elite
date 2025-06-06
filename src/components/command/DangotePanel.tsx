
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionGate, useAuth } from "@/components/auth/LoginSystem";
import { DollarSign, AlertTriangle, Package, TrendingUp, Users, Clock } from "lucide-react";

const DangotePanel = () => {
  const { auditLog } = useAuth();

  // Cash Exposure Map Data
  const cashExposure = [
    { source: 'Moniepoint Balance', amount: 2847350, status: 'live', risk: 'low' },
    { source: 'Bank Balance (GT Bank)', amount: 1250000, status: 'verified', risk: 'low' },
    { source: 'Cash with DAs', amount: 847500, status: 'unverified', risk: 'high' },
    { source: 'Goods with DAs', amount: 1200000, status: 'pending', risk: 'medium' },
    { source: 'Pending Refunds', amount: 125000, status: 'processing', risk: 'medium' },
    { source: 'Unpaid Vendors', amount: 320000, status: 'overdue', risk: 'high' }
  ];

  // Unrecovered Value Data
  const unrecoveredItems = [
    { category: 'Goods Not Returned', amount: 340000, count: 12, daysOverdue: 15 },
    { category: 'Refunds Not Reimbursed', amount: 125000, count: 8, daysOverdue: 22 },
    { category: 'Expired Inventory', amount: 85000, count: 45, daysOverdue: 7 },
    { category: 'Damaged Goods', amount: 67500, count: 15, daysOverdue: 12 },
    { category: 'Vendor Debts', amount: 240000, count: 5, daysOverdue: 30 },
    { category: 'Bonus Overpayments', amount: 45000, count: 3, daysOverdue: 45 }
  ];

  // DA Discipline Matrix
  const daData = [
    { 
      name: 'Lagos-1 (Adebayo)', 
      lateReports: 2, 
      systemBypasses: 0, 
      behaviorFlags: 1, 
      status: 'active',
      cashExposure: 150000,
      efficiency: 92
    },
    { 
      name: 'Lagos-3 (Chioma)', 
      lateReports: 5, 
      systemBypasses: 2, 
      behaviorFlags: 3, 
      status: 'probation',
      cashExposure: 347500,
      efficiency: 78
    },
    { 
      name: 'Abuja-2 (Ibrahim)', 
      lateReports: 1, 
      systemBypasses: 0, 
      behaviorFlags: 0, 
      status: 'active',
      cashExposure: 125000,
      efficiency: 96
    },
    { 
      name: 'PH-1 (Grace)', 
      lateReports: 8, 
      systemBypasses: 3, 
      behaviorFlags: 4, 
      status: 'penalty',
      cashExposure: 280000,
      efficiency: 65
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

  const handleDisciplineAction = (daName: string, action: string) => {
    auditLog(`DA Discipline Action: ${action} for ${daName}`, 'Dangote Panel');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Exposure Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Cash Exposure Map
            </CardTitle>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(cashExposure.reduce((sum, item) => sum + item.amount, 0))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cashExposure.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{item.source}</span>
                    {item.risk === 'high' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{formatCurrency(item.amount)}</span>
                    <Badge className={`text-xs ${
                      item.risk === 'high' ? 'bg-red-100 text-red-800' :
                      item.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
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

        {/* Unrecovered Value Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Unrecovered Value Dashboard
            </CardTitle>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(unrecoveredItems.reduce((sum, item) => sum + item.amount, 0))}
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
                    <Badge className={`text-xs ${
                      item.daysOverdue > 30 ? 'bg-red-100 text-red-800' :
                      item.daysOverdue > 14 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
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
      </div>

      {/* DA & Vendor Discipline Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            DA & Vendor Discipline Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PermissionGate panel="dangote" action="view">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Agent</th>
                    <th className="text-center p-3 font-medium">Late Reports</th>
                    <th className="text-center p-3 font-medium">System Bypasses</th>
                    <th className="text-center p-3 font-medium">Behavior Flags</th>
                    <th className="text-center p-3 font-medium">Cash Exposure</th>
                    <th className="text-center p-3 font-medium">Efficiency</th>
                    <th className="text-center p-3 font-medium">Status</th>
                    <th className="text-center p-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {daData.map((da, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{da.name}</td>
                      <td className="text-center p-3">
                        <Badge variant={da.lateReports > 3 ? "destructive" : "secondary"}>
                          {da.lateReports}
                        </Badge>
                      </td>
                      <td className="text-center p-3">
                        <Badge variant={da.systemBypasses > 0 ? "destructive" : "secondary"}>
                          {da.systemBypasses}
                        </Badge>
                      </td>
                      <td className="text-center p-3">
                        <Badge variant={da.behaviorFlags > 2 ? "destructive" : "secondary"}>
                          {da.behaviorFlags}
                        </Badge>
                      </td>
                      <td className="text-center p-3 font-mono text-sm">
                        <span className={da.cashExposure > 300000 ? 'text-red-600 font-bold' : ''}>
                          {formatCurrency(da.cashExposure)}
                        </span>
                      </td>
                      <td className="text-center p-3">
                        <span className={da.efficiency < 80 ? 'text-red-600 font-bold' : 'text-green-600'}>
                          {da.efficiency}%
                        </span>
                      </td>
                      <td className="text-center p-3">
                        <Badge className={`${
                          da.status === 'active' ? 'bg-green-100 text-green-800' :
                          da.status === 'probation' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {da.status}
                        </Badge>
                      </td>
                      <td className="text-center p-3">
                        <PermissionGate 
                          panel="dangote" 
                          action="edit"
                          fallback={<span className="text-xs text-gray-500">View Only</span>}
                        >
                          <Button 
                            size="sm" 
                            variant="outline" 
                            disabled={da.status === 'active'}
                            className="text-xs"
                            onClick={() => handleDisciplineAction(da.name, da.status === 'penalty' ? 'Deactivate' : 'Escalate')}
                          >
                            {da.status === 'penalty' ? 'Deactivate' : 'Escalate'}
                          </Button>
                        </PermissionGate>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium text-orange-800">Enforcement Rules</div>
              <div className="text-xs text-orange-600">
                • 3+ late reports = automatic probation<br />
                • Any system bypass = immediate review<br />
                • Cash exposure &gt;₦300k = locked dispatch<br />
                • Efficiency &lt;70% = performance improvement plan
              </div>
            </div>
          </PermissionGate>
        </CardContent>
      </Card>
    </div>
  );
};

export default DangotePanel;
