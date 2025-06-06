
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Target, DollarSign, CheckCircle, XCircle } from "lucide-react";

interface BonusEligibilityControlProps {
  canApprove: boolean;
}

const BonusEligibilityControl = ({ canApprove }: BonusEligibilityControlProps) => {
  const [selectedReason, setSelectedReason] = useState<string>('');

  const bonusData = [
    {
      department: 'Telesales',
      staff: [
        {
          name: 'Adunni Okafor',
          kpis: { deliveryRate: 85, targetRate: 80, ordersProcessed: 45, target: 40 },
          eligible: true,
          bonusAmount: 25000,
          binCompliance: true,
          paymentConfirmation: true
        },
        {
          name: 'Kemi Adeleke',
          kpis: { deliveryRate: 72, targetRate: 80, ordersProcessed: 38, target: 40 },
          eligible: false,
          bonusAmount: 0,
          binCompliance: true,
          paymentConfirmation: true
        }
      ]
    },
    {
      department: 'Media Buyers',
      staff: [
        {
          name: 'Tunde Bakare',
          kpis: { cpl: 850, targetCPL: 1000, orderCount: 120, target: 100 },
          eligible: true,
          bonusAmount: 35000,
          binCompliance: true,
          paymentConfirmation: true
        },
        {
          name: 'Fatima Hassan',
          kpis: { cpl: 1200, targetCPL: 1000, orderCount: 85, target: 100 },
          eligible: false,
          bonusAmount: 0,
          binCompliance: true,
          paymentConfirmation: false
        }
      ]
    },
    {
      department: 'DAs',
      staff: [
        {
          name: 'Lagos-1 (Adebayo)',
          kpis: { deliveryCount: 28, target: 25, binClearance: 95, targetClearance: 90 },
          eligible: true,
          bonusAmount: 15000,
          binCompliance: true,
          paymentConfirmation: true
        },
        {
          name: 'Lagos-3 (Chioma)',
          kpis: { deliveryCount: 22, target: 25, binClearance: 78, targetClearance: 90 },
          eligible: false,
          bonusAmount: 0,
          binCompliance: false,
          paymentConfirmation: true
        }
      ]
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

  const totalEligibleAmount = bonusData.reduce((sum, dept) => 
    sum + dept.staff.filter(s => s.eligible).reduce((deptSum, staff) => deptSum + staff.bonusAmount, 0), 0
  );

  const totalEligibleStaff = bonusData.reduce((sum, dept) => 
    sum + dept.staff.filter(s => s.eligible).length, 0
  );

  const totalStaff = bonusData.reduce((sum, dept) => sum + dept.staff.length, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Bonus Liability</p>
                <p className="text-2xl font-bold text-yellow-400">{formatCurrency(totalEligibleAmount)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Eligible Staff</p>
                <p className="text-2xl font-bold text-green-400">{totalEligibleStaff}/{totalStaff}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Blocked Bonuses</p>
                <p className="text-2xl font-bold text-red-400">{totalStaff - totalEligibleStaff}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Bonus</p>
                <p className="text-2xl font-bold text-blue-400">
                  {totalEligibleStaff > 0 ? formatCurrency(totalEligibleAmount / totalEligibleStaff) : '₦0'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bonus Eligibility Control Center */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Target className="w-5 h-5" />
            Bonus Eligibility Control Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {bonusData.map((department, deptIndex) => (
              <div key={deptIndex} className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {department.department}
                </h3>
                
                <div className="grid gap-4">
                  {department.staff.map((staff, staffIndex) => (
                    <div key={staffIndex} className="border border-gray-600 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-white">{staff.name}</h4>
                          <Badge className={staff.eligible ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                            {staff.eligible ? 'ELIGIBLE' : 'BLOCKED'}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Bonus Amount</p>
                          <p className={`text-xl font-bold ${staff.eligible ? 'text-yellow-400' : 'text-gray-500'}`}>
                            {formatCurrency(staff.bonusAmount)}
                          </p>
                        </div>
                      </div>

                      {/* KPI Breakdown */}
                      <div className="bg-gray-900 rounded p-3 mb-4">
                        <h5 className="font-medium text-yellow-400 mb-2">KPI Performance</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {department.department === 'Telesales' && (
                            <>
                              <div>
                                <p className="text-gray-400">Delivery Rate</p>
                                <p className={`font-bold ${(staff.kpis as any).deliveryRate >= (staff.kpis as any).targetRate ? 'text-green-400' : 'text-red-400'}`}>
                                  {(staff.kpis as any).deliveryRate}% (Target: {(staff.kpis as any).targetRate}%)
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Orders Processed</p>
                                <p className={`font-bold ${(staff.kpis as any).ordersProcessed >= (staff.kpis as any).target ? 'text-green-400' : 'text-red-400'}`}>
                                  {(staff.kpis as any).ordersProcessed} (Target: {(staff.kpis as any).target})
                                </p>
                              </div>
                            </>
                          )}
                          {department.department === 'Media Buyers' && (
                            <>
                              <div>
                                <p className="text-gray-400">CPL</p>
                                <p className={`font-bold ${(staff.kpis as any).cpl <= (staff.kpis as any).targetCPL ? 'text-green-400' : 'text-red-400'}`}>
                                  ₦{(staff.kpis as any).cpl} (Target: ≤₦{(staff.kpis as any).targetCPL})
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Order Count</p>
                                <p className={`font-bold ${(staff.kpis as any).orderCount >= (staff.kpis as any).target ? 'text-green-400' : 'text-red-400'}`}>
                                  {(staff.kpis as any).orderCount} (Target: {(staff.kpis as any).target})
                                </p>
                              </div>
                            </>
                          )}
                          {department.department === 'DAs' && (
                            <>
                              <div>
                                <p className="text-gray-400">Delivery Count</p>
                                <p className={`font-bold ${(staff.kpis as any).deliveryCount >= (staff.kpis as any).target ? 'text-green-400' : 'text-red-400'}`}>
                                  {(staff.kpis as any).deliveryCount} (Target: {(staff.kpis as any).target})
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Bin Clearance</p>
                                <p className={`font-bold ${(staff.kpis as any).binClearance >= (staff.kpis as any).targetClearance ? 'text-green-400' : 'text-red-400'}`}>
                                  {(staff.kpis as any).binClearance}% (Target: {(staff.kpis as any).targetClearance}%)
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Validation Checks */}
                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          {staff.binCompliance ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                          <span className={staff.binCompliance ? 'text-green-400' : 'text-red-400'}>Bin Compliance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {staff.paymentConfirmation ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                          <span className={staff.paymentConfirmation ? 'text-green-400' : 'text-red-400'}>Payment Confirmed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {staff.eligible ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                          <span className={staff.eligible ? 'text-green-400' : 'text-red-400'}>KPI Threshold</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {canApprove && staff.eligible && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Approve Bonus
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            Reject with Reason
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="text-sm font-medium text-blue-400">System Enforcement Rules</div>
            <div className="text-xs text-blue-300 mt-1">
              • No manual bonus triggers - only system-validated KPIs unlock approval buttons<br />
              • All approvals require FC timestamp and optional reason<br />
              • Rejected bonuses automatically lock until next review cycle<br />
              • Bin compliance and payment confirmation are mandatory for all bonus approvals
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BonusEligibilityControl;
