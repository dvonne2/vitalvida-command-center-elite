
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, RefreshCw, AlertTriangle, TrendingUp, DollarSign, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FinancialReport {
  section: string;
  keyData: string[];
  primarySources: string[];
  updateFrequency: string;
  displayLocation: string;
  lastUpdated: string;
  status: 'live' | 'pending' | 'error';
}

const FinancialReportsTable = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const financialReports: FinancialReport[] = [
    {
      section: 'Cash Flow Statement',
      keyData: [
        'Cash In (Moniepoint, GT Bank)',
        'Cash Out (Payroll, Bonuses, Inventory)', 
        'Net Cash Movement (daily, weekly, monthly)'
      ],
      primarySources: ['Zoho Books', 'Moniepoint API', 'Zoho CRM'],
      updateFrequency: 'Daily + Export Weekly for QBR',
      displayLocation: 'Elumelu Layer → Cash Flow Panel',
      lastUpdated: '2 hours ago',
      status: 'live'
    },
    {
      section: 'Profit & Loss Statement (P&L)',
      keyData: [
        'Revenue (Fulfilled Orders Only)',
        'COGS (Product cost from Zoho Inventory)',
        'Gross Margin',
        'Ad Spend, Bonuses, Payroll',
        'Net Profit/Loss'
      ],
      primarySources: ['Zoho Books', 'Zoho CRM', 'Inventory Module'],
      updateFrequency: 'Daily + Weekly Snapshots',
      displayLocation: 'Brian Panel → P&L Dashboard',
      lastUpdated: '30 minutes ago',
      status: 'live'
    },
    {
      section: 'Balance Sheet',
      keyData: [
        'Assets: Cash, Inventory (Zoho), Receivables',
        'Liabilities: Vendor Payables, Refunds Owed',
        'Equity: Retained Earnings'
      ],
      primarySources: ['Zoho Books', 'Inventory', 'Moniepoint'],
      updateFrequency: 'Live + Lock at Month-End',
      displayLocation: 'Brian Panel → Balance Sheet View',
      lastUpdated: '1 hour ago',
      status: 'live'
    },
    {
      section: 'Statement of Changes in Equity',
      keyData: [
        'Opening Equity',
        '+ Net Profit',
        '+ Capital Injections (if any)',
        '– Drawings/Dividends',
        '= Closing Equity'
      ],
      primarySources: ['Calculated from P&L + Balance Sheet'],
      updateFrequency: 'Auto-calculated monthly',
      displayLocation: 'Board Reports Tab → Equity Summary',
      lastUpdated: '3 days ago',
      status: 'pending'
    }
  ];

  const handleRefreshReport = (reportSection: string) => {
    toast({
      title: "Refreshing Report",
      description: `Syncing ${reportSection} from source systems...`,
    });
  };

  const handleExportReport = (reportSection: string) => {
    toast({
      title: "Exporting Report", 
      description: `Generating ${reportSection} for download...`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getReportIcon = (section: string) => {
    if (section.includes('Cash Flow')) return <TrendingUp className="w-4 h-4" />;
    if (section.includes('P&L')) return <BarChart className="w-4 h-4" />;
    if (section.includes('Balance')) return <DollarSign className="w-4 h-4" />;
    if (section.includes('Equity')) return <TrendingUp className="w-4 h-4" />;
    return <BarChart className="w-4 h-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5" />
          Financial Reports Integration Table
        </CardTitle>
        <p className="text-sm text-gray-600">
          Unified data sources for all financial statements
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Reports Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialReports.map((report, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getReportIcon(report.section)}
                        <h4 className="font-medium text-sm">{report.section}</h4>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                        {report.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-medium">Sources: </span>
                        <span className="text-gray-600">
                          {report.primarySources.join(', ')}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Update: </span>
                        <span className="text-gray-600">{report.updateFrequency}</span>
                      </div>
                      <div>
                        <span className="font-medium">Last: </span>
                        <span className="text-gray-600">{report.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRefreshReport(report.section)}
                        className="text-xs"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Sync
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExportReport(report.section)}
                        className="text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Financial Report</th>
                    <th className="text-left p-3 font-medium">Key Data Points</th>
                    <th className="text-left p-3 font-medium">Primary Sources</th>
                    <th className="text-left p-3 font-medium">Update Frequency</th>
                    <th className="text-left p-3 font-medium">Display Location</th>
                    <th className="text-center p-3 font-medium">Status</th>
                    <th className="text-center p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {financialReports.map((report, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getReportIcon(report.section)}
                          <span className="font-medium text-sm">{report.section}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <ul className="text-xs space-y-1">
                          {report.keyData.map((data, i) => (
                            <li key={i} className="text-gray-600">• {data}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          {report.primarySources.map((source, i) => (
                            <Badge key={i} variant="outline" className="text-xs mr-1 mb-1">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-xs text-gray-600">
                        {report.updateFrequency}
                      </td>
                      <td className="p-3 text-xs text-blue-600">
                        {report.displayLocation}
                      </td>
                      <td className="text-center p-3">
                        <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                          {report.status}
                        </Badge>
                      </td>
                      <td className="text-center p-3">
                        <div className="flex justify-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRefreshReport(report.section)}
                            className="text-xs p-1"
                          >
                            <RefreshCw className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleExportReport(report.section)}
                            className="text-xs p-1"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Integration Notes</span>
          </div>
          <div className="text-xs text-blue-600">
            • All reports sync from Zoho ecosystem + Moniepoint API<br />
            • Live updates ensure real-time decision making<br />
            • Month-end locks prevent historical data changes<br />
            • Automated calculations reduce manual errors
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialReportsTable;
