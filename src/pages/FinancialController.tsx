
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, DollarSign, Users, Package, TrendingUp, FileText, Download } from "lucide-react";
import DABinReceivables from "@/components/fc/DABinReceivables";
import PaymentReconciliation from "@/components/fc/PaymentReconciliation";
import BonusEligibilityControl from "@/components/fc/BonusEligibilityControl";
import ExceptionDashboard from "@/components/fc/ExceptionDashboard";
import CashFlowForecast from "@/components/fc/CashFlowForecast";
import BudgetTracker from "@/components/fc/BudgetTracker";
import AuditTrail from "@/components/fc/AuditTrail";

const FinancialController = () => {
  const [userRole, setUserRole] = useState<'CEO' | 'FC' | 'Bookkeeper'>('FC');
  
  // Critical alerts for FC
  const criticalAlerts = [
    { type: 'danger', message: 'DA Lagos-3 cash exposure exceeds ₦300k limit', value: '₦347,500', module: 'receivables' },
    { type: 'warning', message: 'Payment-Order mismatch detected', value: '₦75,200', module: 'payments' },
    { type: 'danger', message: 'Bonus payout would exceed cash threshold', value: '₦125,000', module: 'bonuses' }
  ];

  const canApprove = userRole === 'CEO' || userRole === 'FC';
  const canEdit = userRole === 'FC';
  const isReadOnly = userRole === 'CEO';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-black border-b border-yellow-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-yellow-400">Vitalvida Financial Controller Portal</h1>
              <p className="text-sm text-gray-400">Shelley Reynolds-Grade Financial Control System</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={userRole} 
                onChange={(e) => setUserRole(e.target.value as any)}
                className="px-3 py-1 border border-yellow-500/30 rounded bg-gray-800 text-white"
              >
                <option value="FC">Financial Controller</option>
                <option value="CEO">CEO Access</option>
                <option value="Bookkeeper">Bookkeeper</option>
              </select>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                <Shield className="w-3 h-3 mr-1" />
                {userRole}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts Bar */}
      {criticalAlerts.length > 0 && (
        <div className="bg-red-900/30 border-b border-red-500/30">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="font-medium text-red-200">Critical Financial Alerts:</span>
              <div className="flex gap-6 overflow-x-auto">
                {criticalAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                    <span className="text-sm text-red-200">{alert.message}</span>
                    <Badge variant="destructive" className="text-xs">{alert.value}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="receivables" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-gray-800">
            <TabsTrigger value="receivables" className="flex items-center gap-2 data-[state=active]:bg-yellow-500/20">
              <Package className="w-4 h-4" />
              Receivables
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2 data-[state=active]:bg-yellow-500/20">
              <DollarSign className="w-4 h-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="bonuses" className="flex items-center gap-2 data-[state=active]:bg-yellow-500/20">
              <Users className="w-4 h-4" />
              Bonuses
            </TabsTrigger>
            <TabsTrigger value="exceptions" className="flex items-center gap-2 data-[state=active]:bg-yellow-500/20">
              <AlertTriangle className="w-4 h-4" />
              Exceptions
            </TabsTrigger>
            <TabsTrigger value="cashflow" className="flex items-center gap-2 data-[state=active]:bg-yellow-500/20">
              <TrendingUp className="w-4 h-4" />
              Cash Flow
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2 data-[state=active]:bg-yellow-500/20">
              <FileText className="w-4 h-4" />
              Budget
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2 data-[state=active]:bg-yellow-500/20">
              <Shield className="w-4 h-4" />
              Audit
            </TabsTrigger>
          </TabsList>

          {/* Phase 1 & 2: DA Bin Receivables */}
          <TabsContent value="receivables">
            <DABinReceivables canEdit={canEdit} />
          </TabsContent>

          {/* Phase 2: Payment Reconciliation */}
          <TabsContent value="payments">
            <PaymentReconciliation canEdit={canEdit} />
          </TabsContent>

          {/* Phase 3: Bonus Control */}
          <TabsContent value="bonuses">
            <BonusEligibilityControl canApprove={canApprove} />
          </TabsContent>

          {/* Phase 4: Exception Monitoring */}
          <TabsContent value="exceptions">
            <ExceptionDashboard />
          </TabsContent>

          {/* Phase 5: Cash Flow Forecast */}
          <TabsContent value="cashflow">
            <CashFlowForecast />
          </TabsContent>

          {/* Phase 6: Budget Tracking */}
          <TabsContent value="budget">
            <BudgetTracker />
          </TabsContent>

          {/* Phase 6: Audit Trail */}
          <TabsContent value="audit">
            <AuditTrail />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialController;
