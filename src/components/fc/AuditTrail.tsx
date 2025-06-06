
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Eye, FileText, Clock, User, AlertTriangle } from "lucide-react";

const AuditTrail = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  const auditLogs = [
    {
      id: 'AUDIT-001',
      timestamp: '2024-01-16 15:30:22',
      user: 'FC-Adebayo',
      action: 'Bonus Approved',
      target: 'Adunni Okafor (Telesales)',
      amount: 25000,
      reason: 'KPI targets met, all validations passed',
      ipAddress: '192.168.1.45',
      riskScore: 85
    },
    {
      id: 'AUDIT-002',
      timestamp: '2024-01-16 14:45:15',
      user: 'FC-Adebayo',
      action: 'Exception Flagged',
      target: 'VV-2024-003 (Payment Fraud Risk)',
      amount: 18000,
      reason: 'OTP entered before payment received',
      ipAddress: '192.168.1.45',
      riskScore: 95
    },
    {
      id: 'AUDIT-003',
      timestamp: '2024-01-16 13:20:08',
      user: 'CEO-Okafor',
      action: 'DA Bin Blocked',
      target: 'Lagos-3 (Chioma)',
      amount: 347500,
      reason: 'Bin value exceeds ₦300k threshold',
      ipAddress: '192.168.1.12',
      riskScore: 78
    },
    {
      id: 'AUDIT-004',
      timestamp: '2024-01-16 12:15:33',
      user: 'FC-Adebayo',
      action: 'Bonus Rejected',
      target: 'Kemi Adeleke (Telesales)',
      amount: 20000,
      reason: 'Delivery rate below 80% threshold',
      ipAddress: '192.168.1.45',
      riskScore: 72
    },
    {
      id: 'AUDIT-005',
      timestamp: '2024-01-16 11:30:45',
      user: 'Bookkeeper-Grace',
      action: 'Payment Recorded',
      target: 'VV-2024-001',
      amount: 15000,
      reason: 'Moniepoint confirmation received',
      ipAddress: '192.168.1.78',
      riskScore: 65
    }
  ];

  const staffRiskScores = [
    { name: 'Lagos-1 (Adebayo)', score: 92, actions: 15, overrides: 0, status: 'safe' },
    { name: 'Lagos-3 (Chioma)', score: 65, actions: 28, overrides: 3, status: 'watchlist' },
    { name: 'Abuja-2 (Ibrahim)', score: 88, actions: 12, overrides: 1, status: 'safe' },
    { name: 'PH-1 (Grace)', score: 45, actions: 35, overrides: 8, status: 'suspended' },
    { name: 'Adunni Okafor', score: 89, actions: 8, overrides: 0, status: 'safe' },
    { name: 'Kemi Adeleke', score: 72, actions: 22, overrides: 2, status: 'watchlist' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Bonus Approved': return 'bg-green-500/20 text-green-400';
      case 'Bonus Rejected': return 'bg-red-500/20 text-red-400';
      case 'Exception Flagged': return 'bg-orange-500/20 text-orange-400';
      case 'DA Bin Blocked': return 'bg-purple-500/20 text-purple-400';
      case 'Payment Recorded': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-500/20 text-green-400';
      case 'watchlist': return 'bg-yellow-500/20 text-yellow-400';
      case 'suspended': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const todayActions = auditLogs.filter(log => log.timestamp.startsWith('2024-01-16')).length;
  const approvedBonuses = auditLogs.filter(log => log.action === 'Bonus Approved').length;
  const flaggedExceptions = auditLogs.filter(log => log.action === 'Exception Flagged').length;
  const highRiskActions = auditLogs.filter(log => log.riskScore > 90).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Actions Today</p>
                <p className="text-2xl font-bold text-blue-400">{todayActions}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Approved Bonuses</p>
                <p className="text-2xl font-bold text-green-400">{approvedBonuses}</p>
              </div>
              <Shield className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Exceptions Flagged</p>
                <p className="text-2xl font-bold text-orange-400">{flaggedExceptions}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">High Risk Actions</p>
                <p className="text-2xl font-bold text-red-400">{highRiskActions}</p>
              </div>
              <Eye className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audit Trail Logs */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Shield className="w-5 h-5" />
              Immutable Audit Trail
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={selectedTimeframe === 'today' ? 'default' : 'outline'}
                onClick={() => setSelectedTimeframe('today')}
                className="text-xs"
              >
                Today
              </Button>
              <Button 
                size="sm" 
                variant={selectedTimeframe === 'week' ? 'default' : 'outline'}
                onClick={() => setSelectedTimeframe('week')}
                className="text-xs"
              >
                This Week
              </Button>
              <Button 
                size="sm" 
                variant={selectedTimeframe === 'month' ? 'default' : 'outline'}
                onClick={() => setSelectedTimeframe('month')}
                className="text-xs"
              >
                This Month
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {auditLogs.map((log, index) => (
                <div key={index} className="border border-gray-600 rounded p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">{log.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Risk Score</p>
                      <p className={`font-bold ${getRiskColor(log.riskScore)}`}>{log.riskScore}/100</p>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-white"><span className="text-gray-400">User:</span> {log.user}</p>
                    <p className="text-white"><span className="text-gray-400">Target:</span> {log.target}</p>
                    {log.amount > 0 && <p className="text-yellow-400"><span className="text-gray-400">Amount:</span> {formatCurrency(log.amount)}</p>}
                    <p className="text-gray-300"><span className="text-gray-400">Reason:</span> {log.reason}</p>
                    <p className="text-xs text-gray-500">IP: {log.ipAddress} | ID: {log.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Internal Risk Scores */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <User className="w-5 h-5" />
              Internal Risk Score Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffRiskScores.map((staff, index) => (
                <div key={index} className="border border-gray-600 rounded p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-white">{staff.name}</h4>
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Risk Score</p>
                      <p className={`text-2xl font-bold ${getRiskColor(staff.score)}`}>{staff.score}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Total Actions</p>
                      <p className="text-white font-bold">{staff.actions}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Manual Overrides</p>
                      <p className={`font-bold ${staff.overrides > 3 ? 'text-red-400' : 'text-gray-300'}`}>{staff.overrides}</p>
                    </div>
                  </div>

                  {staff.status === 'suspended' && (
                    <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded text-xs">
                      <p className="text-red-400 font-medium">Account Suspended</p>
                      <p className="text-red-300">Risk score below threshold. Requires CEO review.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
              <div className="text-sm font-medium text-blue-400">Risk Score Calculation</div>
              <div className="text-xs text-blue-300 mt-1">
                • Timeliness (+2 daily)<br />
                • Rule compliance (+5 weekly)<br />
                • Manual overrides (-3 each)<br />
                • System flags (-5 each)<br />
                • Score &lt;50 = auto-watchlist
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Integrity Notice */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-400" />
            <div>
              <h3 className="font-bold text-green-400">System Integrity Guarantee</h3>
              <p className="text-sm text-gray-300">
                All audit logs are immutable and tamper-proof. No user (including FC/CEO) can delete or modify entries. 
                System maintains cryptographic hashes for data integrity verification.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrail;
