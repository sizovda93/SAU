import { useState, useEffect } from 'react';
import { getSettings, updateSetting, uploadToPath, SiteSetting } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Upload, Trash2, Monitor, Smartphone, Video } from 'lucide-react';

const SCREENSHOT_SLOTS = [
  { key: 'screenshot_partner_cabinet', label: 'Личный кабинет партнера', mobile: false },
  { key: 'screenshot_case_card', label: 'Карточка дела', mobile: false },
  { key: 'screenshot_chat', label: 'Внутренний чат — диалоги', mobile: false },
  { key: 'screenshot_chat_2', label: 'Внутренний чат — каналы', mobile: false },
  { key: 'screenshot_case_submission', label: 'Подача дела', mobile: false },
  { key: 'screenshot_academy', label: 'Академия — курсы', mobile: false },
  { key: 'screenshot_academy_2', label: 'Академия — курс', mobile: false },
  { key: 'screenshot_academy_3', label: 'Академия — урок', mobile: false },
  { key: 'screenshot_mobile_app', label: 'Мобильное приложение для партнера', mobile: true },
  { key: 'screenshot_mobile_partner_2', label: 'Чат в приложении партнера', mobile: true },
  { key: 'screenshot_mobile_partner_3', label: 'Уведомления партнера', mobile: true },
  { key: 'screenshot_mobile_creditor', label: 'Мобильное приложение для доверителя', mobile: true },
];

export function ScreenshotsManager() {
  const [screenshots, setScreenshots] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      const map: Record<string, string> = {};
      (data as SiteSetting[]).forEach((s) => {
        if ((s.setting_key.startsWith('screenshot_') || s.setting_key === 'hero_video') && s.setting_value) {
          map[s.setting_key] = s.setting_value;
        }
      });
      setScreenshots(map);
    } catch (error: any) {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(key);
      const result = await uploadToPath(file);
      await updateSetting(key, result.publicUrl);
      setScreenshots((prev) => ({ ...prev, [key]: result.publicUrl }));
      toast({ title: 'Загружено', description: `Скриншот "${SCREENSHOT_SLOTS.find((s) => s.key === key)?.label}" обновлён` });
    } catch (error: any) {
      toast({ title: 'Ошибка загрузки', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const handleRemove = async (key: string) => {
    try {
      await updateSetting(key, '');
      setScreenshots((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      toast({ title: 'Удалено' });
    } catch (error: any) {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading('hero_video');
      const result = await uploadToPath(file);
      await updateSetting('hero_video', result.publicUrl);
      setScreenshots((prev) => ({ ...prev, hero_video: result.publicUrl }));
      toast({ title: 'Загружено', description: 'Видео для главной страницы обновлено' });
    } catch (error: any) {
      toast({ title: 'Ошибка загрузки', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const handleVideoRemove = async () => {
    try {
      await updateSetting('hero_video', '');
      setScreenshots((prev) => {
        const next = { ...prev };
        delete next.hero_video;
        return next;
      });
      toast({ title: 'Удалено' });
    } catch (error: any) {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="space-y-6">
      {/* Hero video */}
      <h2 className="text-2xl font-bold">Видео на главной</h2>
      <p className="text-gray-500">Загрузите видео для фоновой секции на главной странице (MP4, WebM, до 50 МБ).</p>
      <div className="overflow-hidden rounded-xl border bg-gray-50">
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          {screenshots.hero_video ? (
            <video src={screenshots.hero_video} className="h-full w-full object-cover" muted loop autoPlay />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-300">
              <Video className="h-10 w-10" />
              <span className="text-sm">Нет видео</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 p-4">
          <span className="text-sm font-medium">Фоновое видео Hero</span>
          <div className="flex gap-2">
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              id="upload-hero-video"
              className="hidden"
              onChange={handleVideoUpload}
              disabled={uploading === 'hero_video'}
            />
            <Button size="sm" variant="outline" asChild disabled={uploading === 'hero_video'}>
              <label htmlFor="upload-hero-video" className="cursor-pointer">
                <Upload className="mr-1 h-4 w-4" />
                {uploading === 'hero_video' ? 'Загрузка...' : 'Загрузить'}
              </label>
            </Button>
            {screenshots.hero_video && (
              <Button size="sm" variant="destructive" onClick={handleVideoRemove}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold">Скриншоты платформы</h2>
      <p className="text-gray-500">Загрузите скриншоты для раздела «Интерфейс платформы» на главной странице.</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SCREENSHOT_SLOTS.map((slot) => {
          const url = screenshots[slot.key];
          const isUploading = uploading === slot.key;
          const inputId = `upload-${slot.key}`;

          return (
            <div
              key={slot.key}
              className="overflow-hidden rounded-xl border bg-gray-50"
            >
              <div className={`relative ${slot.mobile ? 'aspect-[9/16] max-h-[300px]' : 'aspect-[16/10]'} w-full overflow-hidden bg-slate-100`}>
                {url ? (
                  <img src={url} alt={slot.label} className="h-full w-full object-cover object-top" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-300">
                    {slot.mobile ? <Smartphone className="h-10 w-10" /> : <Monitor className="h-10 w-10" />}
                    <span className="text-sm">Нет изображения</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <span className="text-sm font-medium">{slot.label}</span>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    id={inputId}
                    className="hidden"
                    onChange={(e) => handleUpload(slot.key, e)}
                    disabled={isUploading}
                  />
                  <Button size="sm" variant="outline" asChild disabled={isUploading}>
                    <label htmlFor={inputId} className="cursor-pointer">
                      <Upload className="mr-1 h-4 w-4" />
                      {isUploading ? 'Загрузка...' : 'Загрузить'}
                    </label>
                  </Button>
                  {url && (
                    <Button size="sm" variant="destructive" onClick={() => handleRemove(slot.key)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
