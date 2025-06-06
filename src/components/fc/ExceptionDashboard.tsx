
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Eye, FileText, Clock, Users } from "lucide-react";

const ExceptionDashboard = () => {
  const exceptionData = [
    {
      id: 'EX-001',
      type: 'payment_mismatch',
      severity: 'critical',
      timestamp: '2024-01-16 14:45:00',
      description: 'Payment received ₦25,000 but no matching order found',
      affectedOrder: 'VV-2024-002',
      staff: 'Lagos-3 (Chioma)',
      autoFlag: true,
      investigated: false
    },
    {
      id: 'EX-002', 
      type: 'otp_violation',
      severity: 'high',
      timestamp: '2024-01-16 13:30:00',
      description: 'OTP entered before payment received - fraud risk',
      affectedOrder: 'VV-2024-003',
      staff: 'Abuja-2 (Ibrahim)',
      autoFlag: true,
      investigated: false
    },
    {
      id: 'EX-003',
      type: 'refund_spike',
      severity: 'medium',
      timestamp: '2024-01-16 12:15:00',
      description: '5 refunds in 2 hours from same DA',
      affectedOrder: 'Multiple',
      staff: 'PH-1 (Grace)',
      autoFlag: true,
      investigated: true
    },
    {
      id: 'EX-004',
      type: 'manual_override',
      severity: 'high',
      timestamp: '2024-01-16 11:00:00',
      description: 'Manual CRM status update bypassing system workflow',
      affectedOrder: 'VV-2024-001',
      staff: 'Kemi Adeleke (Telesales)',
      autoFlag: true,
      investigated: false
    },
    {
      id: 'EX-005',
      type: 'bin_exposure',
      severity: 'critical',
      timestamp: '2024-01-16 10:30:00',
      description: 'DA bin value exceeds ₦300k threshold',
      affectedOrder: 'N/A',
      staff: 'Lagos-3 (Chioma)',
      autoFlag: true,
      investigated: false
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment_mismatch': return '💳';
      case 'otp_violation': return '🔐';
      case 'refund_spike': return '↩️';
      case 'manual_override': return '✏️';
      case 'bin_exposure': return '📦';
      default: return '⚠️';
    }
  };

  const criticalCount = exceptionData.filter(e => e.severity === 'critical').length;
  const highCount = exceptionData.filter(e => e.severity === 'high').length;
  const uninvestigatedCount = exceptionData.filter(e => !e.investigated).length;
  const todayTotal = exceptionData.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Critical Exceptions</p>
                <p className="text-2xl font-bold text-red-400">{criticalCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-orange-400">{highCount}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Needs Investigation</p>
                <p className="text-2xl font-bold text-yellow-400">{uninvestigatedCount}</p>
              </div>
              <Eye className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Today's Total</p>
                <p className="text-2xl font-bold text-blue-400">{todayTotal}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exception Dashboard */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <AlertTriangle className="w-5 h-5" />
            Exception Dashboard (Daily Audit Panel)
          </CardTitle>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">Auto-populated exceptions requiring FC attention</p>
            <Button 
              size="sm" 
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export PDF Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exceptionData.map((exception, index) => (
              <div key={index} className="border border-gray-600 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(exception.type)}</span>
                    <div>
                      <h3 className="font-bold text-white">Exception {exception.id}</h3>
                      <p className="text-sm text-gray-400">{exception.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(exception.severity)}>
                      {exception.severity.toUpperCase()}
                    </Badge>
                    {exception.investigated ? (
                      <Badge className="bg-green-500/20 text-green-400">INVESTIGATED</Badge>
                    ) : (
                      <Badge className="bg-red-500/20 text-red-400">PENDING</Badge>
                    )}
                  </div>
                </div>

                <div className="bg-gray-900 rounded p-3">
                  <p className="text-white">{exception.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Affected Order</p>
                    <p className="text-white font-mono">{exception.affectedOrder}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Staff Involved</p>
                    <p className="text-white">{exception.staff}</p>
                  </div>
                </div>

                {!exception.investigated && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Investigate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                    >
                      Mark Resolved
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Escalate
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="text-sm font-medium text-purple-400">Auto-Detection Rules</div>
            <div className="text-xs text-purple-300 mt-1">
              • Payment-order mismatches = instant critical flag<br />
              • OTP before payment = fraud risk (high priority)<br />
              • 3+ refunds in 4 hours = medium flag<br />
              • Manual CRM overrides = high priority review<br />
              • Bin value &gt;₦300k = critical exposure flag<br />
              • All exceptions auto-emailed to FC + CEO daily at 11 AM
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExceptionDashboard;
