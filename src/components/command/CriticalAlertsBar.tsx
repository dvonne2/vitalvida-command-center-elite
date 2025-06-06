
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X, ChevronDown, ChevronUp, Bell, Download } from "lucide-react";
import { useAuth } from "@/components/auth/LoginSystem";

interface CriticalAlert {
  id: string;
  type: string;
  title: string;
  message: string;
  amount: string;
  timestamp: string;
  resolved: boolean;
  severity: 'high' | 'medium' | 'low';
  actionPath: string;
}

const CriticalAlertsBar = () => {
  const { user, auditLog } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const [alerts, setAlerts] = useState<CriticalAlert[]>([
    {
      id: 'alert-001',
      type: 'DA_CASH_EXPOSURE',
      title: 'DA Cash Exposure Detected',
      message: 'DA Ikeja-7 cash exposure detected — policy violated ₦5.00',
      amount: '₦5.00',
      timestamp: new Date().toISOString(),
      resolved: false,
      severity: 'high',
      actionPath: 'Resolve in Dangote Panel → Cash Exposure Map'
    },
    {
      id: 'alert-002',
      type: 'UNPAID_DELIVERY',
      title: 'Unpaid Delivered Order',
      message: 'Order 101567 delivered — no payment matched ₦32,750',
      amount: '₦32,750',
      timestamp: new Date().toISOString(),
      resolved: false,
      severity: 'high',
      actionPath: 'Resolve in Bookkeeping Panel → Daily Receivables'
    },
    {
      id: 'alert-003',
      type: 'REFUND_NO_TRAIL',
      title: 'Refund Without System Trail',
      message: 'Refund flagged — no supporting trail ₦75,000',
      amount: '₦75,000',
      timestamp: new Date().toISOString(),
      resolved: false,
      severity: 'high',
      actionPath: 'Resolve in Audit Panel → Escalated Casebook'
    },
    {
      id: 'alert-004',
      type: 'BANK_MISMATCH',
      title: 'Bank Reconciliation Mismatch',
      message: 'Reconciliation mismatch — unexplained gap ₦45,200',
      amount: '₦45,200',
      timestamp: new Date().toISOString(),
      resolved: false,
      severity: 'medium',
      actionPath: 'Resolve in Elumelu Panel → Bank Reconciliation'
    },
    {
      id: 'alert-005',
      type: 'BONUS_KPI_BREACH',
      title: 'Bonus Trigger Without KPI Match',
      message: 'Bonus breach — CPL target not met for ₦80 payout',
      amount: '₦80',
      timestamp: new Date().toISOString(),
      resolved: false,
      severity: 'medium',
      actionPath: 'Resolve in Olsavsky Panel → Efficiency Leak Detector'
    },
    {
      id: 'alert-006',
      type: 'LOW_DELIVERY_RATE',
      title: 'Delivery Rate Below 50%',
      message: 'Delivery rate alert — team conversion dropped to 47%',
      amount: 'N/A',
      timestamp: new Date().toISOString(),
      resolved: false,
      severity: 'medium',
      actionPath: 'Resolve in Dangote Panel → Turnover Velocity'
    },
    {
      id: 'alert-007',
      type: 'IDLE_INVENTORY',
      title: 'Idle Inventory > 7 Days',
      message: 'Bin Lagos-Island-3 idle > 7 days — ₦280,000 stock at risk',
      amount: '₦280,000',
      timestamp: new Date().toISOString(),
      resolved: false,
      severity: 'high',
      actionPath: 'Resolve in Dangote Panel → Unsellable Stock Tracker'
    }
  ]);

  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    // Auto-trigger notifications for unresolved alerts
    const unresolvedAlerts = alerts.filter(alert => !alert.resolved);
    if (unresolvedAlerts.length > 0) {
      triggerWebhookNotifications(unresolvedAlerts);
    }
  }, [alerts]);

  const triggerWebhookNotifications = async (alertsToSend: CriticalAlert[]) => {
    if (!webhookUrl) return;

    for (const alert of alertsToSend) {
      try {
        const payload = {
          event: `Critical Alert: ${alert.type}`,
          message: alert.message,
          timestamp: alert.timestamp,
          severity: alert.severity,
          amount: alert.amount,
          recipients: [
            { email: 'admin@vitalvida.ng', role: 'CEO' },
            { email: 'vitalvidafinancecfo@gmail.com', role: 'FC' }
          ]
        };

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        auditLog(`Webhook notification sent for alert: ${alert.type}`);
      } catch (error) {
        console.error('Webhook notification failed:', error);
        auditLog(`Webhook notification failed for alert: ${alert.type}`);
      }
    }
  };

  const resolveAlert = (alertId: string, justification: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, resolved: true }
        : alert
    ));
    auditLog(`Alert resolved: ${alertId} - Justification: ${justification}`);
  };

  const generateQBRReport = () => {
    const unresolvedAlerts = alerts.filter(alert => !alert.resolved);
    const reportData = {
      timestamp: new Date().toISOString(),
      totalUnresolved: unresolvedAlerts.length,
      highSeverityCount: unresolvedAlerts.filter(a => a.severity === 'high').length,
      totalRiskValue: unresolvedAlerts.reduce((sum, alert) => {
        const amount = alert.amount.replace('₦', '').replace(',', '');
        return sum + (isNaN(Number(amount)) ? 0 : Number(amount));
      }, 0),
      alertsByType: unresolvedAlerts.reduce((acc, alert) => {
        acc[alert.type] = (acc[alert.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };

    // In a real implementation, this would generate and email a PDF
    console.log('QBR Report Data:', reportData);
    auditLog('QBR Report generated and sent to CEO and FC');
  };

  const unresolvedAlerts = alerts.filter(alert => !alert.resolved);
  const highSeverityCount = unresolvedAlerts.filter(alert => alert.severity === 'high').length;

  return (
    <div className="w-full">
      {/* Critical Alerts Header */}
      <div className="bg-red-50 border-b border-red-200">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-800">
                Critical Alerts ({unresolvedAlerts.length} unresolved)
              </span>
              {highSeverityCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {highSeverityCount} High Priority
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={generateQBRReport}
                className="text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                Generate QBR
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert List */}
      {isExpanded && (
        <div className="bg-white border-b">
          <div className="px-6 py-4">
            <div className="grid gap-3">
              {unresolvedAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{alert.title}</span>
                          <Badge 
                            variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {alert.severity}
                          </Badge>
                          {alert.amount !== 'N/A' && (
                            <Badge variant="outline" className="text-xs font-mono">
                              {alert.amount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                        <p className="text-xs text-blue-600 cursor-pointer hover:underline">
                          → {alert.actionPath}
                        </p>
                      </div>
                      {(user?.role === 'CEO' || user?.role === 'FC') && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const justification = prompt('Enter resolution justification:');
                            if (justification) {
                              resolveAlert(alert.id, justification);
                            }
                          }}
                          className="ml-4 text-xs"
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Webhook Configuration (Admin Only) */}
            {user?.role === 'CEO' && (
              <Card className="mt-4 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Webhook URL for SMS/WhatsApp Notifications
                      </label>
                      <input
                        type="url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="https://api.vitalvida.ng/webhook/alerts"
                        className="w-full px-3 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CriticalAlertsBar;
