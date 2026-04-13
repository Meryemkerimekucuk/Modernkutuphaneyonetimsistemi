import { User, Mail, Phone, MapPin, Calendar, Edit, Save } from 'lucide-react';
import { useState } from 'react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'Yönetici',
    email: 'admin@kutuphane.com',
    phone: '+90 532 123 4567',
    address: 'Kadıköy, İstanbul',
    position: 'Kütüphane Müdürü',
    joinDate: '2020-01-15',
  });

  const handleSave = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl text-zinc-900 mb-1">Profil</h1>
        <p className="text-zinc-500">Hesap bilgilerinizi görüntüleyin ve düzenleyin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">
                {profile.firstName[0]}{profile.lastName[0]}
              </span>
            </div>
            <h2 className="text-xl text-zinc-900 mb-1">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-sm text-zinc-500">{profile.position}</p>
          </div>

          <div className="space-y-3 pt-6 border-t border-zinc-100">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-600">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-600">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-600">{profile.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-600">Kayıt: {profile.joinDate}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-100">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Profili Düzenle
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg text-zinc-900">Profil Bilgileri</h2>
            {isEditing && (
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm"
              >
                <Save className="w-4 h-4" />
                Kaydet
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Ad</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className={`w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 ${
                  !isEditing ? 'bg-zinc-50' : ''
                }`}
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Soyad</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className={`w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 ${
                  !isEditing ? 'bg-zinc-50' : ''
                }`}
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Email</label>
              <input
                type="email"
                disabled={!isEditing}
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className={`w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 ${
                  !isEditing ? 'bg-zinc-50' : ''
                }`}
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Telefon</label>
              <input
                type="tel"
                disabled={!isEditing}
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className={`w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 ${
                  !isEditing ? 'bg-zinc-50' : ''
                }`}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-700 mb-2">Adres</label>
              <textarea
                disabled={!isEditing}
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                rows={3}
                className={`w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 ${
                  !isEditing ? 'bg-zinc-50' : ''
                }`}
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Pozisyon</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.position}
                onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                className={`w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 ${
                  !isEditing ? 'bg-zinc-50' : ''
                }`}
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Kayıt Tarihi</label>
              <input
                type="date"
                disabled
                value={profile.joinDate}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg bg-zinc-50"
              />
            </div>
          </div>

          {/* Activity Stats */}
          <div className="mt-8 pt-8 border-t border-zinc-100">
            <h3 className="text-base text-zinc-900 mb-4">Aktivite İstatistikleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-50 rounded-lg p-4">
                <div className="text-2xl text-zinc-900 mb-1">1,247</div>
                <div className="text-sm text-zinc-500">İşlem Sayısı</div>
              </div>
              <div className="bg-zinc-50 rounded-lg p-4">
                <div className="text-2xl text-zinc-900 mb-1">342</div>
                <div className="text-sm text-zinc-500">Eklenen Kitap</div>
              </div>
              <div className="bg-zinc-50 rounded-lg p-4">
                <div className="text-2xl text-zinc-900 mb-1">89</div>
                <div className="text-sm text-zinc-500">Eklenen Üye</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
