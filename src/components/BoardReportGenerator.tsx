
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, AlertTriangle } from "lucide-react";

interface BoardReportGeneratorProps {
  canGenerate: boolean;
}

const BoardReportGenerator = ({ canGenerate }: BoardReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const reportSections = [
    { section: 'Executive Summary', status: 'ready', critical: true },
    { section: 'Top 5 Cash Risks', status: 'ready', critical: true },
    { section: 'Department Performance Scores', status: 'ready', critical: false },
    { section: 'Budget vs Actual Analysis', status: 'ready', critical: false },
    { section: 'Profitability Breakdown', status: 'ready', critical: false },
    { section: 'Leadership Accountability', status: 'ready', critical: true },
    { section: 'Recovery Performance', status: 'ready', critical: false },
    { section: '13-Week Forecast Charts', status: 'ready', critical: false }
  ];

  const criticalRisks = [
    { risk: 'DA Cash Exposure >₦300k', severity: 'high', amount: '₦347,500' },
    { risk: 'Bank Reconciliation Mismatch', severity: 'medium', amount: '₦45,200' },
    { risk: 'Unrecovered Inventory Value', severity: 'high', amount: '₦902,500' },
    { risk: 'Vendor Payment Delays', severity: 'medium', amount: '₦320,000' },
    { risk: 'Refund Processing Backlog', severity: 'low', amount: '₦125,000' }
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Here you would trigger actual PDF generation
      console.log('Board report generated');
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Board-Grade Report Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Report Sections */}
            <div>
              <h3 className="font-medium mb-3">Report Sections</h3>
              <div className="space-y-2">
                {reportSections.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">{item.section}</span>
                    <div className="flex items-center gap-2">
                      {item.critical && <AlertTriangle className="w-3 h-3 text-orange-500" />}
                      <Badge variant={item.status === 'ready' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Risks Preview */}
            <div>
              <h3 className="font-medium mb-3">Top 5 Cash Risks (Preview)</h3>
              <div className="space-y-2">
                {criticalRisks.map((risk, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium">{risk.risk}</span>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">{risk.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              Last generated: March 15, 2024 at 9:30 AM
            </div>
            
            <Button 
              onClick={handleGenerateReport}
              disabled={!canGenerate || isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isGenerating ? 'Generating...' : 'Generate Board Report'}
            </Button>
          </div>

          {!canGenerate && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium text-yellow-800">Access Restricted</div>
              <div className="text-xs text-yellow-600">
                Board report generation requires CEO-level access.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Schedule & Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-sm mb-2">Weekly Snapshot</div>
              <div className="text-xs text-gray-600 mb-2">Every Friday 6:00 PM</div>
              <div className="text-xs">
                Recipients: CEO, Finance Controller, Board Members
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-sm mb-2">Monthly Deep Dive</div>
              <div className="text-xs text-gray-600 mb-2">1st Monday of each month</div>
              <div className="text-xs">
                Recipients: Full Executive Team, Board of Directors
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">Dangote x Elumelu Standard</div>
            <div className="text-xs text-blue-600">
              "The board must never be surprised by financial reality. Every risk must be visible before it becomes a crisis."
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardReportGenerator;
