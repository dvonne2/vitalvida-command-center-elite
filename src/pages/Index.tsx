
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, TrendingUp, DollarSign, Users, Package, Clock, Shield, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CashExposureMap from "@/components/CashExposureMap";
import UnrecoveredValueDashboard from "@/components/UnrecoveredValueDashboard";
import DADisciplineMatrix from "@/components/DADisciplineMatrix";
import CostToServePanel from "@/components/CostToServePanel";
import UnsellableStockTracker from "@/components/UnsellableStockTracker";
import CashFlowForecast from "@/components/CashFlowForecast";
import FinancialKPIs from "@/components/FinancialKPIs";
import BoardReportGenerator from "@/components/BoardReportGenerator";

const Index = () => {
  const [userRole, setUserRole] = useState<'CEO' | 'FC' | 'Accountant' | 'Ops'>('CEO');
  
  // Critical alerts that appear at top
  const criticalAlerts = [
    { type: 'danger', message: 'DA Lagos-3 cash exposure exceeds ₦300k limit', value: '₦347,500' },
    { type: 'warning', message: 'Bank reconciliation mismatch detected', value: '₦45,200' },
    { type: 'danger', message: 'Refund request without system trail', value: '₦75,000' }
  ];

  const canEdit = userRole === 'CEO' || userRole === 'FC';
  const canViewAll = userRole === 'CEO';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vitalvida Financial Command Center</h1>
              <p className="text-sm text-gray-600">Dangote Control × Elumelu Intelligence</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/fc">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Shield className="w-4 h-4 mr-2" />
                  FC Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <select 
                value={userRole} 
                onChange={(e) => setUserRole(e.target.value as any)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="CEO">CEO Access</option>
                <option value="FC">Finance Controller</option>
                <option value="Accountant">Accountant</option>
                <option value="Ops">Operations</option>
              </select>
              <Badge variant="outline" className="bg-blue-50">
                <Shield className="w-3 h-3 mr-1" />
                {userRole}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts Bar */}
      {criticalAlerts.length > 0 && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-800">Critical Alerts:</span>
              <div className="flex gap-6 overflow-x-auto">
                {criticalAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                    <span className="text-sm text-red-700">{alert.message}</span>
                    <Badge variant="destructive" className="text-xs">{alert.value}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="dangote-blocks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dangote-blocks" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Dangote Blocks
            </TabsTrigger>
            <TabsTrigger value="elumelu-layers" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Elumelu Layers
            </TabsTrigger>
            <TabsTrigger value="board-reports" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Board Reports
            </TabsTrigger>
          </TabsList>

          {/* DANGOTE BLOCKS */}
          <TabsContent value="dangote-blocks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CashExposureMap />
              <UnrecoveredValueDashboard />
            </div>
            
            <DADisciplineMatrix canEdit={canEdit} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CostToServePanel />
              <UnsellableStockTracker />
            </div>
          </TabsContent>

          {/* ELUMELU LAYERS */}
          <TabsContent value="elumelu-layers" className="space-y-6">
            <CashFlowForecast />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FinancialKPIs />
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Bank Reconciliation Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Moniepoint Balance</span>
                      <span className="text-green-700 font-bold">₦2,847,350</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Bank Balance</span>
                      <span className="text-blue-700 font-bold">₦2,802,150</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Variance</span>
                      <span className="text-red-700 font-bold">₦45,200</span>
                    </div>
                    <Button variant="outline" className="w-full" disabled={!canEdit}>
                      Investigate Mismatch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* BOARD REPORTS */}
          <TabsContent value="board-reports">
            <BoardReportGenerator canGenerate={canViewAll} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
