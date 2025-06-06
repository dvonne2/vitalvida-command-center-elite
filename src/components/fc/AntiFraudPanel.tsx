
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, Eye, FileText, Users, Clock, Ban, Flag } from "lucide-react";

interface AntiFraudPanelProps {
  canEdit: boolean;
}

const AntiFraudPanel = ({ canEdit }: AntiFraudPanelProps) => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  // Mock data for demonstration
  const violationData = [
    {
      id: 'VL-001',
      staffName: 'Lagos-3 (Chioma)',
      staffRole: 'DA',
      violationType: 'OTP_BEFORE_PAYMENT',
      iaCode: 'IA-103',
      severity: 'critical',
      timestamp: '2024-01-16 14:30:00',
      description: 'OTP entered 15 minutes before Moniepoint payment confirmation',
      orderRef: 'VV-2024-003',
      autoAction: 'DA locked out for 48 hours',
      status: 'auto_enforced',
      riskScore: 85
    },
    {
      id: 'VL-002',
      staffName: 'Kemi Adeleke',
      staffRole: 'Telesales',
      violationType: 'MANUAL_CRM_EDIT',
      iaCode: 'IA-105',
      severity: 'high',
      timestamp: '2024-01-16 13:15:00',
      description: 'Manual status change with no call log evidence',
      orderRef: 'VV-2024-005',
      autoAction: 'Removed from lead queue',
      status: 'under_review',
      riskScore: 72
    },
    {
      id: 'VL-003',
      staffName: 'Abuja-2 (Ibrahim)',
      staffRole: 'DA',
      violationType: 'UNVERIFIED_PAYMENT',
      iaCode: 'IA-109',
      severity: 'medium',
      timestamp: '2024-01-16 11:45:00',
      description: 'Payment matched manually without API verification',
      orderRef: 'VV-2024-001',
      autoAction: 'Flagged for FC review',
      status: 'escalated',
      riskScore: 58
    }
  ];

  const enforcementCases = [
    {
      caseId: 'EC-001',
      staffName: 'Lagos-3 (Chioma)',
      caseStatus: 'open',
      violationCount: 3,
      totalRisk: 'critical',
      lastViolation: '2024-01-16',
      estimatedExposure: 125000,
      openDays: 2,
      assignedTo: 'FC Review'
    },
    {
      caseId: 'EC-002',
      staffName: 'Grace Okoro',
      caseStatus: 'escalated',
      violationCount: 5,
      totalRisk: 'critical',
      lastViolation: '2024-01-15',
      estimatedExposure: 75000,
      openDays: 5,
      assignedTo: 'CEO + HR'
    }
  ];

  const dailyBulletin = {
    date: '2024-01-16',
    totalViolations: 8,
    criticalFlags: 3,
    staffUnderWatch: 4,
    autoEnforced: 6,
    estimatedRisk: 347500,
    topPatterns: [
      'OTP fraud attempts increased 200% this week',
      'Manual CRM edits spiking in Lagos region',
      'Refund processing without DA reconciliation'
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'auto_enforced': return 'bg-green-500/20 text-green-400';
      case 'under_review': return 'bg-yellow-500/20 text-yellow-400';
      case 'escalated': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Fraud Watch Bulletin */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="w-5 h-5" />
            Daily Fraud Watch Bulletin - {dailyBulletin.date}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">{dailyBulletin.totalViolations}</p>
              <p className="text-sm text-gray-400">Total Violations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-400">{dailyBulletin.criticalFlags}</p>
              <p className="text-sm text-gray-400">Critical Flags</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{dailyBulletin.staffUnderWatch}</p>
              <p className="text-sm text-gray-400">Staff Under Watch</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{dailyBulletin.autoEnforced}</p>
              <p className="text-sm text-gray-400">Auto-Enforced</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{formatCurrency(dailyBulletin.estimatedRisk)}</p>
              <p className="text-sm text-gray-400">Risk Exposure</p>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-medium text-red-400 mb-2">Emerging Threat Patterns</h4>
            <ul className="space-y-1">
              {dailyBulletin.topPatterns.map((pattern, index) => (
                <li key={index} className="text-sm text-red-300">• {pattern}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="violations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="violations" className="flex items-center gap-2 data-[state=active]:bg-red-500/20">
            <AlertTriangle className="w-4 h-4" />
            Live Violations
          </TabsTrigger>
          <TabsTrigger value="ledger" className="flex items-center gap-2 data-[state=active]:bg-red-500/20">
            <FileText className="w-4 h-4" />
            Behavior Ledger
          </TabsTrigger>
          <TabsTrigger value="enforcement" className="flex items-center gap-2 data-[state=active]:bg-red-500/20">
            <Ban className="w-4 h-4" />
            Enforcement
          </TabsTrigger>
          <TabsTrigger value="cases" className="flex items-center gap-2 data-[state=active]:bg-red-500/20">
            <Flag className="w-4 h-4" />
            Case Management
          </TabsTrigger>
        </TabsList>

        {/* Live Violations Detection */}
        <TabsContent value="violations">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Eye className="w-5 h-5" />
                Real-Time Deception Detection Engine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {violationData.map((violation, index) => (
                  <div key={index} className="border border-gray-600 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white">{violation.id} - {violation.staffName}</h3>
                        <p className="text-sm text-gray-400">{violation.timestamp}</p>
                        <p className="text-sm text-yellow-400">IA Code: {violation.iaCode}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(violation.severity)}>
                          {violation.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(violation.status)}>
                          {violation.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded p-3">
                      <p className="text-red-300 font-medium">{violation.description}</p>
                      <p className="text-sm text-gray-400 mt-1">Order: {violation.orderRef}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Auto Action Taken</p>
                        <p className="text-orange-400">{violation.autoAction}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Risk Score</p>
                        <p className={`font-bold ${violation.riskScore > 70 ? 'text-red-400' : violation.riskScore > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {violation.riskScore}/100
                        </p>
                      </div>
                    </div>

                    {canEdit && violation.status === 'under_review' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          <Ban className="w-4 h-4 mr-2" />
                          Enforce Penalty
                        </Button>
                        <Button size="sm" variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                          <Flag className="w-4 h-4 mr-2" />
                          Escalate to CEO
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                          Clear Violation
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Behavioral Violation Ledger */}
        <TabsContent value="ledger">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <FileText className="w-5 h-5" />
                Immutable Behavioral Violation Ledger
              </CardTitle>
              <p className="text-sm text-gray-400">Permanent record of all staff violations - no edits or deletions allowed</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-3 font-medium text-gray-400">Staff</th>
                      <th className="text-left p-3 font-medium text-gray-400">Role</th>
                      <th className="text-center p-3 font-medium text-gray-400">IA Code</th>
                      <th className="text-center p-3 font-medium text-gray-400">Severity</th>
                      <th className="text-center p-3 font-medium text-gray-400">Date</th>
                      <th className="text-center p-3 font-medium text-gray-400">Risk Score</th>
                      <th className="text-center p-3 font-medium text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {violationData.map((violation, index) => (
                      <tr key={index} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="p-3 text-white">{violation.staffName}</td>
                        <td className="p-3 text-gray-300">{violation.staffRole}</td>
                        <td className="text-center p-3">
                          <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                            {violation.iaCode}
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          <Badge className={getSeverityColor(violation.severity)}>
                            {violation.severity}
                          </Badge>
                        </td>
                        <td className="text-center p-3 text-gray-300 font-mono text-sm">
                          {violation.timestamp.split(' ')[0]}
                        </td>
                        <td className="text-center p-3">
                          <span className={`font-bold ${violation.riskScore > 70 ? 'text-red-400' : violation.riskScore > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {violation.riskScore}
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <Badge className={getStatusColor(violation.status)}>
                            {violation.status.replace('_', ' ')}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <div className="text-sm font-medium text-purple-400">Ledger Security</div>
                <div className="text-xs text-purple-300 mt-1">
                  • All entries are immutable - no editing or deletion allowed<br />
                  • Blockchain-style hash verification for data integrity<br />
                  • Access limited to FC, CEO, and Legal team only<br />
                  • Full audit trail maintained for regulatory compliance
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enforcement Actions */}
        <TabsContent value="enforcement">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Ban className="w-5 h-5" />
                Auto-Enforcement & Penalty System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-red-400 mb-4">Active Enforcement Rules</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white">OTP Before Payment (IA-103)</span>
                        <Badge className="bg-red-500/20 text-red-400">AUTO-LOCK 48H</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">DA locked from delivery system</p>
                    </div>
                    <div className="bg-gray-900 rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Manual CRM Edits (IA-105)</span>
                        <Badge className="bg-orange-500/20 text-orange-400">QUEUE REMOVAL</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">Removed from lead queue</p>
                    </div>
                    <div className="bg-gray-900 rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Large Refunds (IA-106)</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400">BONUS FREEZE</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">Bonus payments suspended</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-red-400 mb-4">Currently Enforced</h4>
                  <div className="space-y-3">
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Lagos-3 (Chioma)</span>
                        <Badge className="bg-red-500/20 text-red-400">LOCKED</Badge>
                      </div>
                      <p className="text-sm text-red-300 mt-1">Delivery access blocked - 46h remaining</p>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Kemi Adeleke</span>
                        <Badge className="bg-orange-500/20 text-orange-400">RESTRICTED</Badge>
                      </div>
                      <p className="text-sm text-orange-300 mt-1">Lead queue access removed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="text-sm font-medium text-red-400">Enforcement Principles</div>
                <div className="text-xs text-red-300 mt-1">
                  • All penalties are automatically applied by the system<br />
                  • No manual override possible without dual FC + CEO approval<br />
                  • Penalties increase with repeat violations<br />
                  • Staff cannot see their own enforcement status
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Case Management */}
        <TabsContent value="cases">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Flag className="w-5 h-5" />
                Enforcement Case Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enforcementCases.map((case_, index) => (
                  <div key={index} className="border border-gray-600 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white">{case_.caseId} - {case_.staffName}</h3>
                        <p className="text-sm text-gray-400">Opened {case_.openDays} days ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={case_.totalRisk === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}>
                          {case_.totalRisk.toUpperCase()}
                        </Badge>
                        <Badge className={case_.caseStatus === 'escalated' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}>
                          {case_.caseStatus.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Violations</p>
                        <p className="text-red-400 font-bold">{case_.violationCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Exposure</p>
                        <p className="text-yellow-400 font-bold">{formatCurrency(case_.estimatedExposure)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Assigned To</p>
                        <p className="text-white">{case_.assignedTo}</p>
                      </div>
                    </div>

                    {canEdit && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => setSelectedCase(case_.caseId)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                          <Ban className="w-4 h-4 mr-2" />
                          Escalate to CEO
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                          Close Case
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <div className="text-sm font-medium text-yellow-400">Case Escalation Rules</div>
                <div className="text-xs text-gray-300 mt-1">
                  • 3+ violations in 7 days = auto-escalate to FC<br />
                  • 5+ violations or ₦100k+ exposure = CEO review required<br />
                  • Cases open &gt; 7 days = board notification<br />
                  • Critical cases require legal review before closure
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AntiFraudPanel;
