import { Settings as SettingsIcon, Bell, Lock, Database, Mail, Clock, DollarSign, Save } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [settings, setSettings] = useState({
    borrowDays: 14,
    renewLimit: 2,
    maxBooksPerMember: 5,
    finePerDay: 5,
    emailNotifications: true,
    smsNotifications: false,
    overdueReminders: true,
    autoBackup: true,
    backupFrequency: 'daily',
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl text-zinc-900 mb-1">Ayarlar</h1>
        <p className="text-zinc-500">Kütüphane yönetim sistemi ayarlarını yapılandırın</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* General Settings */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="w-5 h-5 text-zinc-900" />
            <h2 className="text-lg text-zinc-900">Genel Ayarlar</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-700 mb-2">Varsayılan Ödünç Süresi (Gün)</label>
                <input
                  type="number"
                  value={settings.borrowDays}
                  onChange={(e) => setSettings({ ...settings, borrowDays: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-700 mb-2">Yenileme Limiti</label>
                <input
                  type="number"
                  value={settings.renewLimit}
                  onChange={(e) => setSettings({ ...settings, renewLimit: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-700 mb-2">Üye Başına Maksimum Kitap</label>
                <input
                  type="number"
                  value={settings.maxBooksPerMember}
                  onChange={(e) => setSettings({ ...settings, maxBooksPerMember: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-700 mb-2">Günlük Gecikme Cezası (₺)</label>
                <input
                  type="number"
                  value={settings.finePerDay}
                  onChange={(e) => setSettings({ ...settings, finePerDay: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-zinc-900" />
            <h2 className="text-lg text-zinc-900">Bildirim Ayarları</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-sm text-zinc-900 mb-1">Email Bildirimleri</div>
                <div className="text-xs text-zinc-500">Ödünç ve iade bildirimleri email ile gönderilsin</div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-sm text-zinc-900 mb-1">SMS Bildirimleri</div>
                <div className="text-xs text-zinc-500">Gecikme hatırlatmaları SMS ile gönderilsin</div>
              </div>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-sm text-zinc-900 mb-1">Gecikme Hatırlatmaları</div>
                <div className="text-xs text-zinc-500">Son teslim tarihinden 2 gün önce hatırlatma gönder</div>
              </div>
              <input
                type="checkbox"
                checked={settings.overdueReminders}
                onChange={(e) => setSettings({ ...settings, overdueReminders: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
          </div>
        </div>

        {/* Backup Settings */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-5 h-5 text-zinc-900" />
            <h2 className="text-lg text-zinc-900">Yedekleme Ayarları</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-sm text-zinc-900 mb-1">Otomatik Yedekleme</div>
                <div className="text-xs text-zinc-500">Veritabanını otomatik olarak yedekle</div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
            {settings.autoBackup && (
              <div>
                <label className="block text-sm text-zinc-700 mb-2">Yedekleme Sıklığı</label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                >
                  <option value="hourly">Saatlik</option>
                  <option value="daily">Günlük</option>
                  <option value="weekly">Haftalık</option>
                  <option value="monthly">Aylık</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-zinc-900" />
            <h2 className="text-lg text-zinc-900">Güvenlik</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors text-left">
              Şifre Değiştir
            </button>
            <button className="w-full px-4 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors text-left">
              İki Faktörlü Doğrulama
            </button>
            <button className="w-full px-4 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors text-left">
              Oturum Geçmişi
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <Save className="w-4 h-4" />
            Ayarları Kaydet
          </button>
          <button className="px-6 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors">
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}
