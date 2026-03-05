import { useState, useEffect } from 'react';
import { getSettings, updateSetting } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

export function SiteSettingsManager() {
  const [settings, setSettings] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getSettings();

      const settingsMap: { [key: string]: string } = {};
      data?.forEach((item) => {
        settingsMap[item.setting_key] = item.setting_value || '';
      });
      setSettings(settingsMap);
    } catch (error: any) {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const saveSettings = async () => {
    try {
      setLoading(true);

      for (const [key, value] of Object.entries(settings)) {
        await updateSetting(key, value);
      }

      toast({ title: 'Успешно', description: 'Настройки сохранены' });
      setEditOpen(false);
      await fetchSettings();
    } catch (error: any) {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Настройки сайта</h3>

        <div className="space-y-3 text-sm text-gray-600 mb-4">
          <p>Название сайта: <strong>{settings['site_title'] || '—'}</strong></p>
          <p>Описание: <strong>{(settings['site_description'] || '').substring(0, 80)}...</strong></p>
          <p>Email: <strong>{settings['contact_email'] || '—'}</strong></p>
          <p>Телефон: <strong>{settings['contact_phone'] || '—'}</strong></p>
          <p>Заголовок баннера: <strong>{settings['hero_title'] || '—'}</strong></p>
        </div>

        <Button onClick={() => setEditOpen(true)} variant="outline" className="w-full">
          ✏️ Редактировать настройки
        </Button>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать настройки сайта</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Название сайта</label>
              <Input
                value={settings['site_title'] || ''}
                onChange={(e) => handleSettingChange('site_title', e.target.value)}
                placeholder="IronChain SAU"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Описание сайта</label>
              <Textarea
                value={settings['site_description'] || ''}
                onChange={(e) => handleSettingChange('site_description', e.target.value)}
                placeholder="Описание платформы"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Контактный email</label>
              <Input
                value={settings['contact_email'] || ''}
                onChange={(e) => handleSettingChange('contact_email', e.target.value)}
                placeholder="info@ironchain.ru"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Контактный телефон</label>
              <Input
                value={settings['contact_phone'] || ''}
                onChange={(e) => handleSettingChange('contact_phone', e.target.value)}
                placeholder="+7 (999) 000-00-00"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Заголовок баннера</label>
              <Input
                value={settings['hero_title'] || ''}
                onChange={(e) => handleSettingChange('hero_title', e.target.value)}
                placeholder="Заголовок главного баннера"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Подзаголовок баннера</label>
              <Textarea
                value={settings['hero_subtitle'] || ''}
                onChange={(e) => handleSettingChange('hero_subtitle', e.target.value)}
                placeholder="Описание под заголовком"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Копирайт</label>
              <Input
                value={settings['footer_copyright'] || ''}
                onChange={(e) => handleSettingChange('footer_copyright', e.target.value)}
                placeholder="© 2025 IronChain"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={saveSettings} className="flex-1">
                💾 Сохранить
              </Button>
              <Button variant="outline" onClick={() => setEditOpen(false)} className="flex-1">
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
