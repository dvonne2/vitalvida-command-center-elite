
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Download, Send, Calendar } from "lucide-react";

const BoardGovernanceEmail = () => {
  const [emailTemplate, setEmailTemplate] = useState({
    reportDate: '2025-01-16',
    subject: '⚖️ Vitalvida Governance & Audit Integrity Report — Week Ending January 16, 2025'
  });

  const departmentScores = [
    { name: 'Inventory', score: 91, status: 'clear', notes: 'Stable control across dispatch and returns' },
    { name: 'Finance', score: 73, status: 'review', notes: 'Delay in Moniepoint matching + 2 unclosed refunds' },
    { name: 'Telesales', score: 62, status: 'risk', notes: '4 manual CRM edits with no logs + 1 flagged bonus payout' },
    { name: 'Logistics', score: 85, status: 'clear', notes: 'All bins cleared within policy' },
    { name: 'Media Buying', score: 77, status: 'monitor', notes: 'CPL outliers under review; 1 flagged over-budget test' }
  ];

  const leadershipAccountability = [
    { leader: 'Telesales Lead', openFlags: 3, daysUnresolved: '6+', level: 'board_review' },
    { leader: 'Inventory Manager', openFlags: 0, daysUnresolved: '-', level: 'compliant' },
    { leader: 'Bookkeeper', openFlags: 2, daysUnresolved: '3', level: 'warning' }
  ];

  const criticalPatterns = [
    '3 refunds processed above ₦50,000 without DA bin reconciliation (IA-106)',
    '2 DAs logged OTP before payment — system auto-blocked (IA-103)',
    '1 telesales bonus manually approved despite failing KPI threshold (IA-107)'
  ];

  const escalatedCases = [
    {
      caseId: 'Case #224',
      description: 'Telesales CRM Fraud — Repeated manual closures to hit quota',
      action: 'HR review and temporary removal from lead queue'
    },
    {
      caseId: 'Case #231',
      description: 'Moniepoint Mismatch – Payment received with no order linkage',
      action: 'FC to audit manual entries + retrain bookkeeper'
    }
  ];

  const actionPoints = [
    'Approve escalation of Case #224 to HR for disciplinary action',
    'Review open flags in Finance — deadline to close is January 20',
    'Authorize training protocol for DA compliance officers by January 25'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'bg-green-500/20 text-green-400';
      case 'review': return 'bg-yellow-500/20 text-yellow-400';
      case 'monitor': return 'bg-blue-500/20 text-blue-400';
      case 'risk': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clear': return '🟢';
      case 'review': return '🟡';
      case 'monitor': return '🔵';
      case 'risk': return '🔴';
      default: return '⚪';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'board_review': return 'bg-red-500/20 text-red-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'compliant': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const generateEmailContent = () => {
    return `Subject: ${emailTemplate.subject}

To:
[CEO Name]
[FC Name]
[Head of Operations]
[Head of HR]
[Legal/Compliance (if applicable)]

Dear Board Team,

This is the Audit & Governance Oversight Summary for the week ending ${emailTemplate.reportDate}, based on the Internal Audit Enforcement Panel and Risk Exposure Systems.

Below is a snapshot of key control outcomes, leadership accountability, and ethical exposure across departments.

🔍 1. Control Integrity Scorecard
${departmentScores.map(dept => 
  `${dept.name}: ${dept.score}/100 - ${getStatusIcon(dept.status)} ${dept.status.toUpperCase()} - ${dept.notes}`
).join('\n')}

🧑‍💼 2. Leadership Accountability Summary
${leadershipAccountability.map(leader => 
  `${leader.leader}: ${leader.openFlags} open flags, ${leader.daysUnresolved} days unresolved - ${leader.level.replace('_', ' ').toUpperCase()}`
).join('\n')}

Note: Per audit policy, any control owner with 3+ unresolved flags over 5 days must present corrective action within 48 hours.

🧠 3. Critical Risk Patterns (Auto-Detected)
${criticalPatterns.map(pattern => `• ${pattern}`).join('\n')}

These patterns indicate growing ethical exposure in finance and telesales workflows.

📂 4. Escalated Casebook Items
${escalatedCases.map(case_ => 
  `${case_.caseId}: ${case_.description}\nRecommended Action: ${case_.action}`
).join('\n\n')}

📈 5. Quarterly Outlook (Preview)
• Overall audit readiness for Q1 stands at 78%
• Target for board compliance score is ≥ 85% across all departments by February
• Governance training recommended for all DA-facing departments before scale-up in Northern region

✅ Action Points for Board
${actionPoints.map(point => `• ${point}`).join('\n')}

For transparency, a PDF version of the full audit report is attached.

Sincerely,
[Your Full Name]
Financial Controller
Vitalvida Governance Office`;
  };

  return (
    <div className="space-y-6">
      {/* Email Template Header */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Mail className="w-5 h-5" />
            Board-Level Governance Email Generator
          </CardTitle>
          <p className="text-sm text-gray-400">Indra K. Nooyi model - Executive oversight and accountability reporting</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Report Date</label>
              <input 
                type="date" 
                value={emailTemplate.reportDate}
                onChange={(e) => setEmailTemplate({...emailTemplate, reportDate: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                Send to Board
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Integrity Scorecard */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">1. Control Integrity Scorecard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-3 font-medium text-gray-400">Department</th>
                  <th className="text-center p-3 font-medium text-gray-400">Score (/100)</th>
                  <th className="text-center p-3 font-medium text-gray-400">Status</th>
                  <th className="text-left p-3 font-medium text-gray-400">Notes</th>
                </tr>
              </thead>
              <tbody>
                {departmentScores.map((dept, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-3 text-white font-medium">{dept.name}</td>
                    <td className="text-center p-3">
                      <span className={`font-bold text-xl ${dept.score >= 85 ? 'text-green-400' : dept.score >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {dept.score}
                      </span>
                    </td>
                    <td className="text-center p-3">
                      <Badge className={getStatusColor(dept.status)}>
                        {getStatusIcon(dept.status)} {dept.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-3 text-gray-300">{dept.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Leadership Accountability */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">2. Leadership Accountability Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leadershipAccountability.map((leader, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-900 rounded">
                <div>
                  <p className="font-medium text-white">{leader.leader}</p>
                  <p className="text-sm text-gray-400">{leader.openFlags} open flags, {leader.daysUnresolved} days unresolved</p>
                </div>
                <Badge className={getLevelColor(leader.level)}>
                  {leader.level.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded">
            <p className="text-sm text-orange-400">
              <strong>Note:</strong> Per audit policy, any control owner with 3+ unresolved flags over 5 days must present corrective action within 48 hours.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Critical Risk Patterns */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">3. Critical Risk Patterns (Auto-Detected)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {criticalPatterns.map((pattern, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <p className="text-red-300">{pattern}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
            <p className="text-sm text-red-400">
              These patterns indicate growing ethical exposure in finance and telesales workflows.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Escalated Cases */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">4. Escalated Casebook Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {escalatedCases.map((case_, index) => (
              <div key={index} className="bg-gray-900 rounded p-4">
                <h4 className="font-medium text-white mb-2">{case_.caseId}</h4>
                <p className="text-gray-300 mb-2">{case_.description}</p>
                <p className="text-sm text-yellow-400">
                  <strong>Recommended Action:</strong> {case_.action}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Points */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">✅ Action Points for Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {actionPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <p className="text-white">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Preview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-blue-400">Generated Email Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded p-4 font-mono text-sm">
            <pre className="text-gray-300 whitespace-pre-wrap">{generateEmailContent()}</pre>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button 
              onClick={() => navigator.clipboard.writeText(generateEmailContent())}
              variant="outline" 
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              Copy to Clipboard
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Weekly
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardGovernanceEmail;
