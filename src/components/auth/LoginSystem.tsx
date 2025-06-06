
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Eye, Lock } from "lucide-react";
import { toast } from "sonner";

interface User {
  email: string;
  role: 'CEO' | 'FC';
  name: string;
  permissions: {
    dangote: { view: boolean; edit: boolean };
    elumelu: { view: boolean; edit: boolean };
    audit: { view: boolean; edit: boolean; override: boolean };
    olsavsky: { view: boolean; edit: boolean };
    bookkeeping: { view: boolean; edit: boolean };
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  auditLog: (action: string, panel?: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Hardcoded user credentials and permissions
const AUTHORIZED_USERS: Record<string, { password: string; user: User }> = {
  'admin@vitalvida.ng': {
    password: 'VitalCEO2024!',
    user: {
      email: 'admin@vitalvida.ng',
      role: 'CEO',
      name: 'CEO - Vitalvida',
      permissions: {
        dangote: { view: true, edit: false },
        elumelu: { view: true, edit: false },
        audit: { view: true, edit: false, override: true },
        olsavsky: { view: true, edit: false },
        bookkeeping: { view: true, edit: false }
      }
    }
  },
  'vitalvidafinancecfo@gmail.com': {
    password: 'VitalFC2024!',
    user: {
      email: 'vitalvidafinancecfo@gmail.com',
      role: 'FC',
      name: 'Financial Controller',
      permissions: {
        dangote: { view: true, edit: true },
        elumelu: { view: true, edit: true },
        audit: { view: true, edit: true, override: false },
        olsavsky: { view: true, edit: true },
        bookkeeping: { view: true, edit: true }
      }
    }
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [auditLogs, setAuditLogs] = useState<Array<{
    timestamp: string;
    user: string;
    action: string;
    panel?: string;
    ip: string;
  }>>([]);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('vitalvida_auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const auditLog = (action: string, panel?: string) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user: user?.email || 'Unknown',
      action,
      panel,
      ip: 'Auto-logged' // In real implementation, would capture actual IP
    };
    
    setAuditLogs(prev => [...prev, logEntry]);
    console.log('AUDIT LOG:', logEntry);
    
    // Store in localStorage for persistence
    const existingLogs = JSON.parse(localStorage.getItem('vitalvida_audit_logs') || '[]');
    localStorage.setItem('vitalvida_audit_logs', JSON.stringify([...existingLogs, logEntry]));
  };

  const login = (email: string, password: string): boolean => {
    const authUser = AUTHORIZED_USERS[email.toLowerCase()];
    
    if (!authUser) {
      auditLog(`Unauthorized login attempt: ${email}`);
      toast.error("Unauthorized access attempt logged");
      // Send alert email in real implementation
      return false;
    }

    if (authUser.password !== password) {
      auditLog(`Failed login attempt: ${email}`);
      toast.error("Invalid credentials");
      return false;
    }

    setUser(authUser.user);
    localStorage.setItem('vitalvida_auth_user', JSON.stringify(authUser.user));
    auditLog(`Successful login: ${email}`);
    toast.success(`Welcome, ${authUser.user.name}`);
    return true;
  };

  const logout = () => {
    if (user) {
      auditLog(`Logout: ${user.email}`);
    }
    setUser(null);
    localStorage.removeItem('vitalvida_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, auditLog }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = login(email, password);
    
    setIsLoading(false);
    if (!success) {
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Shield className="w-6 h-6 text-yellow-500" />
            Vitalvida Financial Command Center
          </CardTitle>
          <p className="text-sm text-gray-600">Authorized Personnel Only</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter authorized email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Access Command Center'}
            </Button>
          </form>
          
          <div className="mt-6 p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Security Notice</span>
            </div>
            <p className="text-xs text-red-600 mt-1">
              All access attempts are logged. Unauthorized access will trigger immediate alerts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const PermissionGate = ({ 
  panel, 
  action, 
  children,
  fallback 
}: { 
  panel: keyof User['permissions'];
  action: 'view' | 'edit' | 'override';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const hasPermission = user.permissions[panel][action as keyof typeof user.permissions[typeof panel]];
  
  if (!hasPermission) {
    return fallback || (
      <div className="p-4 bg-gray-100 rounded-lg text-center">
        <Lock className="w-6 h-6 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">Access Restricted</p>
        <Badge variant="outline" className="text-xs">
          {user.role} - {action.toUpperCase()} permission required
        </Badge>
      </div>
    );
  }
  
  return <>{children}</>;
};
