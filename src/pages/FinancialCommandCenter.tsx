
import React from 'react';
import { AuthProvider, useAuth, LoginPage } from "@/components/auth/LoginSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, LogOut, DollarSign, TrendingUp, AlertTriangle, Users, Package } from "lucide-react";
import DangotePanel from "@/components/command/DangotePanel";
import ElumeluPanel from "@/components/command/ElumeluPanel";
import AuditPanel from "@/components/command/AuditPanel";
import OlsavskyPanel from "@/components/command/OlsavskyPanel";
import BookkeepingPanel from "@/components/command/BookkeepingPanel";
import CriticalAlertsBar from "@/components/command/CriticalAlertsBar";

const CommandCenterContent = () => {
  const { user, logout, auditLog } = useAuth();

  React.useEffect(() => {
    auditLog('Accessed Financial Command Center');
  }, []);

  const handleTabChange = (tab: string) => {
    auditLog(`Switched to ${tab} panel`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-black border-b border-yellow-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-yellow-400">Vitalvida Financial Command Center</h1>
              <p className="text-sm text-gray-400">5-Panel Leadership Control System</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                <Shield className="w-3 h-3 mr-1" />
                {user?.role} - {user?.name}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  auditLog('User logout');
                  logout();
                }}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Banner */}
      <div className="bg-blue-900/30 border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-blue-200">
              Session: {user?.email} | Access Level: {user?.role} | 
              Login Time: {new Date().toLocaleString()}
            </span>
            <span className="text-blue-300">
              All actions are logged and audited
            </span>
          </div>
        </div>
      </div>

      {/* Critical Alerts Bar */}
      <CriticalAlertsBar />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="dangote" className="space-y-6" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-5 bg-gray-800">
            <TabsTrigger value="dangote" className="flex items-center gap-2 data-[state=active]:bg-yellow-500/20">
              <Package className="w-4 h-4" />
              Aliko Dangote Control
            </TabsTrigger>
            <TabsTrigger value="elumelu" className="flex items-center gap-2 data-[state=active]:bg-green-500/20">
              <TrendingUp className="w-4 h-4" />
              Tony Elumelu Intelligence
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2 data-[state=active]:bg-red-500/20">
              <AlertTriangle className="w-4 h-4" />
              Indra Nooyi Audit
            </TabsTrigger>
            <TabsTrigger value="olsavsky" className="flex items-center gap-2 data-[state=active]:bg-blue-500/20">
              <DollarSign className="w-4 h-4" />
              Brian Olsavsky CFO
            </TabsTrigger>
            <TabsTrigger value="bookkeeping" className="flex items-center gap-2 data-[state=active]:bg-purple-500/20">
              <Users className="w-4 h-4" />
              Shelley Reynolds Bookkeeping
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dangote">
            <DangotePanel />
          </TabsContent>

          <TabsContent value="elumelu">
            <ElumeluPanel />
          </TabsContent>

          <TabsContent value="audit">
            <AuditPanel />
          </TabsContent>

          <TabsContent value="olsavsky">
            <OlsavskyPanel />
          </TabsContent>

          <TabsContent value="bookkeeping">
            <BookkeepingPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const FinancialCommandCenter = () => {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
};

const AuthWrapper = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <LoginPage />;
  }
  
  return <CommandCenterContent />;
};

export default FinancialCommandCenter;
