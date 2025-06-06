
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PermissionGate, useAuth } from "@/components/auth/LoginSystem";
import { AlertTriangle, Shield, Users, FileText, Mail } from "lucide-react";

const AuditPanel = () => {
  const { user, auditLog } = useAuth();
  const [newCaseNote, setNewCaseNote] = useState('');

  // IA Code Tracker Data
  const iaCodes = [
    { code: 'IA-101', description: 'Payment entered with no linked Order ID', count: 3, department: 'Finance', severity: 'high' },
    { code: 'IA-103', description: 'OTP entered before payment confirmation', count: 7, department: 'Logistics', severity: 'critical' },
    { code: 'IA-105', description: 'Manual status change with no system log', count: 2, department: 'Telesales', severity: 'medium' },
    { code: 'IA-106', description: 'Refund processed with no DA stock return', count: 1, department: 'Finance', severity: 'high' },
    { code: 'IA-108', description: 'Field edited without valid system reason', count: 4, department: 'CRM', severity: 'medium' },
    { code: 'IA-201', description: 'Repeated flags in same category (7 days)', count: 2, department: 'Multi', severity: 'critical' }
  ];

  // Department Audit Scores
  const departmentScores = [
    { department: 'Inventory', score: 92, status: 'audit-ready', openFlags: 0, trend: 'stable' },
    { department: 'Finance', score: 73, status: 'needs-review', openFlags: 4, trend: 'declining' },
    { department: 'Telesales', score: 62, status: 'at-risk', openFlags: 7, trend: 'declining' },
    { department: 'Logistics', score: 85, status: 'audit-ready', openFlags: 1, trend: 'improving' },
    { department: 'Media Buying', score: 77, status: 'monitor', openFlags: 2, trend: 'stable' }
  ];

  // Leadership Accountability
  const leadershipItems = [
    { leader: 'Telesales Lead', department: 'Telesales', openFlags: 7, daysUnresolved: 6, escalationLevel: 'board-review' },
    { leader: 'Inventory Manager', department: 'Inventory', openFlags: 0, daysUnresolved: 0, escalationLevel: 'compliant' },
    { leader: 'Bookkeeper', department: 'Finance', openFlags: 3, daysUnresolved: 3, escalationLevel: 'warning' },
    { leader: 'Logistics Head', department: 'Logistics', openFlags: 1, daysUnresolved: 1, escalationLevel: 'normal' }
  ];

  // Escalated Cases
  const [escalatedCases, setEscalatedCases] = useState([
    {
      id: 'CASE-224',
      title: 'Telesales CRM Fraud',
      description: 'Repeated manual closures to hit quota',
      department: 'Telesales',
      status: 'open',
      assignedTo: 'HR Review',
      priority: 'high',
      dateCreated: '2025-06-01',
      estimatedLoss: 50000
    },
    {
      id: 'CASE-231',
      title: 'Moniepoint Mismatch',
      description: 'Payment received with no order linkage',
      department: 'Finance',
      status: 'investigating',
      assignedTo: 'FC Audit',
      priority: 'medium',
      dateCreated: '2025-06-03',
      estimatedLoss: 45200
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getEscalationColor = (level: string) => {
    switch (level) {
      case 'board-review': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'compliant': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCaseEscalation = (caseId: string) => {
    auditLog(`Escalated case ${caseId} to board review`, 'Audit Panel');
  };

  const handleResolveFlag = (code: string) => {
    auditLog(`Attempted to resolve IA code ${code}`, 'Audit Panel');
  };

  const sendGovernanceEmail = () => {
    auditLog('Generated weekly governance email', 'Audit Panel');
    alert('Governance email sent to admin@vitalvida.ng and vitalvidafinancecfo@gmail.com');
  };

  return (
    <div className="space-y-6">
      {/* IA Code Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            IA Code Tracker (Internal Audit Violations)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {iaCodes.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={`font-mono ${
                    item.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    item.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.code}
                  </Badge>
                  <span className="text-sm font-bold">{item.count}x</span>
                </div>
                <p className="text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{item.department}</span>
                  <PermissionGate 
                    panel="audit" 
                    action="edit"
                    fallback={<span className="text-xs text-gray-400">View Only</span>}
                  >
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      onClick={() => handleResolveFlag(item.code)}
                    >
                      Review
                    </Button>
                  </PermissionGate>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Readiness Scorecard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Department Audit Readiness Scorecard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Department</th>
                  <th className="text-center p-3 font-medium">Score (/100)</th>
                  <th className="text-center p-3 font-medium">Status</th>
                  <th className="text-center p-3 font-medium">Open Flags</th>
                  <th className="text-center p-3 font-medium">Trend</th>
                  <th className="text-center p-3 font-medium">Priority</th>
                </tr>
              </thead>
              <tbody>
                {departmentScores.map((dept, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{dept.department}</td>
                    <td className="text-center p-3">
                      <Badge className={getScoreColor(dept.score)}>
                        {dept.score}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge className={
                        dept.status === 'audit-ready' ? 'bg-green-100 text-green-800' :
                        dept.status === 'needs-review' ? 'bg-yellow-100 text-yellow-800' :
                        dept.status === 'at-risk' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }>
                        {dept.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <span className={dept.openFlags > 3 ? 'text-red-600 font-bold' : ''}>{dept.openFlags}</span>
                    </td>
                    <td className="text-center p-3">
                      <span className={`text-xs ${
                        dept.trend === 'improving' ? 'text-green-600' :
                        dept.trend === 'declining' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {dept.trend}
                      </span>
                    </td>
                    <td className="text-center p-3">
                      {dept.score < 70 ? (
                        <Badge variant="destructive" className="text-xs">Escalate</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Normal</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <div className="text-sm font-medium text-red-800">Compliance Alert</div>
            <div className="text-xs text-red-600">
              Telesales department requires immediate board review. Target: All departments ≥75 by month-end.
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leadership Accountability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Leadership Accountability Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leadershipItems.map((leader, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-sm">{leader.leader}</div>
                      <div className="text-xs text-gray-500">{leader.department}</div>
                    </div>
                    <Badge className={getEscalationColor(leader.escalationLevel)}>
                      {leader.escalationLevel.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Open Flags: <span className="font-bold">{leader.openFlags}</span></span>
                    <span>Days Unresolved: <span className="font-bold">{leader.daysUnresolved}</span></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium text-orange-800">Accountability Rule</div>
              <div className="text-xs text-orange-600">
                3+ unresolved flags over 5 days = mandatory corrective action within 48 hours.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Escalated Casebook */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Escalated Casebook Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {escalatedCases.map((case_, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-sm">{case_.id}: {case_.title}</div>
                      <div className="text-xs text-gray-500">{case_.description}</div>
                    </div>
                    <Badge className={
                      case_.priority === 'high' ? 'bg-red-100 text-red-800' :
                      case_.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {case_.priority} priority
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    Assigned: {case_.assignedTo} | Estimated Loss: ₦{case_.estimatedLoss.toLocaleString()}
                  </div>
                  <PermissionGate 
                    panel="audit" 
                    action="edit"
                    fallback={<span className="text-xs text-gray-400">View Only</span>}
                  >
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      onClick={() => handleCaseEscalation(case_.id)}
                    >
                      Escalate to Board
                    </Button>
                  </PermissionGate>
                </div>
              ))}
            </div>

            <PermissionGate 
              panel="audit" 
              action="override"
              fallback={<div className="text-xs text-gray-500 text-center mt-4">CEO override required for new cases</div>}
            >
              <div className="mt-4 p-3 border rounded-lg">
                <div className="text-sm font-medium mb-2">Add Case Note (CEO Only)</div>
                <Textarea 
                  value={newCaseNote}
                  onChange={(e) => setNewCaseNote(e.target.value)}
                  placeholder="Enter case details..."
                  className="text-xs"
                />
                <Button size="sm" className="mt-2 w-full">Add to Casebook</Button>
              </div>
            </PermissionGate>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Governance Email Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Weekly Governance Email Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600">Auto-Send Schedule</div>
              <div className="text-lg font-bold text-blue-700">Sunday 9 PM</div>
              <div className="text-xs text-blue-500">Every week</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600">Recipients</div>
              <div className="text-sm font-bold text-green-700">CEO + FC</div>
              <div className="text-xs text-green-500">Board format</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-purple-600">Last Sent</div>
              <div className="text-sm font-bold text-purple-700">Sunday, June 2</div>
              <div className="text-xs text-purple-500">5 escalations</div>
            </div>
          </div>

          <Button onClick={sendGovernanceEmail} className="w-full" size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Send Governance Email Now
          </Button>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">Email Contents</div>
            <div className="text-xs text-blue-600">
              • Department scores • Top 3 flagged anomalies • IA codes and responsible parties<br />
              • Cash position overview • Escalated cases • Recommended actions
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditPanel;
