import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadsManager } from './LeadsManager';
import { ScreenshotsManager } from './ScreenshotsManager';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '279286';

    if (password === adminPassword) {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setPassword('');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Dialog open={!isAuthenticated} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вход в Админ Панель</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Введи пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isAuthenticated && (
        <>
          <div className="border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Админ Панель</h1>
                <p className="text-gray-500">SAU.PRO</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2" size={18} />
                Выход
              </Button>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-3">
                <TabsTrigger value="dashboard">Обзор</TabsTrigger>
                <TabsTrigger value="leads">Заявки</TabsTrigger>
                <TabsTrigger value="screenshots">Скриншоты</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow">
                  <h2 className="mb-4 text-2xl font-bold">Быстрые действия</h2>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('leads')}>
                      Просмотреть заявки
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('screenshots')}>
                      Управление скриншотами
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="leads" className="rounded-lg bg-white p-6 shadow">
                <LeadsManager />
              </TabsContent>

              <TabsContent value="screenshots" className="rounded-lg bg-white p-6 shadow">
                <ScreenshotsManager />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}
