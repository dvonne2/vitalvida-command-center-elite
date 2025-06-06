
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface DADisciplineMatrixProps {
  canEdit: boolean;
}

const DADisciplineMatrix = ({ canEdit }: DADisciplineMatrixProps) => {
  const daData = [
    { 
      name: 'Lagos-1 (Adebayo)', 
      lateReports: 2, 
      systemBypasses: 0, 
      behaviorFlags: 1, 
      status: 'active',
      cashExposure: 150000,
      efficiency: 92
    },
    { 
      name: 'Lagos-3 (Chioma)', 
      lateReports: 5, 
      systemBypasses: 2, 
      behaviorFlags: 3, 
      status: 'probation',
      cashExposure: 347500,
      efficiency: 78
    },
    { 
      name: 'Abuja-2 (Ibrahim)', 
      lateReports: 1, 
      systemBypasses: 0, 
      behaviorFlags: 0, 
      status: 'active',
      cashExposure: 125000,
      efficiency: 96
    },
    { 
      name: 'PH-1 (Grace)', 
      lateReports: 8, 
      systemBypasses: 3, 
      behaviorFlags: 4, 
      status: 'penalty',
      cashExposure: 280000,
      efficiency: 65
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'probation': return 'bg-yellow-100 text-yellow-800';
      case 'penalty': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'probation': return <AlertTriangle className="w-4 h-4" />;
      case 'penalty': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          DA & Vendor Discipline Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Agent</th>
                <th className="text-center p-3 font-medium">Late Reports</th>
                <th className="text-center p-3 font-medium">System Bypasses</th>
                <th className="text-center p-3 font-medium">Behavior Flags</th>
                <th className="text-center p-3 font-medium">Cash Exposure</th>
                <th className="text-center p-3 font-medium">Efficiency</th>
                <th className="text-center p-3 font-medium">Status</th>
                <th className="text-center p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {daData.map((da, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{da.name}</td>
                  <td className="text-center p-3">
                    <Badge variant={da.lateReports > 3 ? "destructive" : "secondary"}>
                      {da.lateReports}
                    </Badge>
                  </td>
                  <td className="text-center p-3">
                    <Badge variant={da.systemBypasses > 0 ? "destructive" : "secondary"}>
                      {da.systemBypasses}
                    </Badge>
                  </td>
                  <td className="text-center p-3">
                    <Badge variant={da.behaviorFlags > 2 ? "destructive" : "secondary"}>
                      {da.behaviorFlags}
                    </Badge>
                  </td>
                  <td className="text-center p-3 font-mono text-sm">
                    <span className={da.cashExposure > 300000 ? 'text-red-600 font-bold' : ''}>
                      {formatCurrency(da.cashExposure)}
                    </span>
                  </td>
                  <td className="text-center p-3">
                    <span className={da.efficiency < 80 ? 'text-red-600 font-bold' : 'text-green-600'}>
                      {da.efficiency}%
                    </span>
                  </td>
                  <td className="text-center p-3">
                    <Badge className={`${getStatusColor(da.status)} flex items-center gap-1 justify-center`}>
                      {getStatusIcon(da.status)}
                      {da.status}
                    </Badge>
                  </td>
                  <td className="text-center p-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      disabled={!canEdit || da.status === 'active'}
                      className="text-xs"
                    >
                      {da.status === 'penalty' ? 'Deactivate' : 'Escalate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
          <div className="text-sm font-medium text-orange-800">Enforcement Rules</div>
          <div className="text-xs text-orange-600">
            • 3+ late reports = automatic probation<br />
            • Any system bypass = immediate review<br />
            • Cash exposure &gt;₦300k = locked dispatch<br />
            • Efficiency &lt;70% = performance improvement plan
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DADisciplineMatrix;
