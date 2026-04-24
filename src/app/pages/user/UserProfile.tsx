import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, X } from 'lucide-react';

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@ornek.com',
    phone: '+90 555 123 4567',
    address: 'Atatürk Cad. No:123 Çankaya/Ankara',
  });

  const [tempData, setTempData] = useState(formData);

  const memberInfo = {
    membershipDate: '2025-08-01',
    membershipType: 'public' as const,
    status: 'active' as const,
    totalBorrowed: 24,
    activeBorrowed: 3,
    overdueBooks: 0,
  };

  const handleEdit = () => {
    setTempData(formData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempData(formData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setFormData(tempData);
    setIsEditing(false);
  };

  const getMembershipTypeLabel = (type: string) => {
    switch (type) {
      case 'student': return 'Öğrenci';
      case 'teacher': return 'Öğretmen';
      case 'public': return 'Genel';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'suspended': return 'Askıda';
      case 'expired': return 'Süresi Dolmuş';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'suspended': return 'bg-amber-100 text-amber-700';
      case 'expired': return 'bg-red-100 text-red-700';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Başlık */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Profilim</h1>
        <p className="text-zinc-600">Hesap bilgileriniz ve üyelik durumunuz</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sol Kolon - Profil Özeti */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
            {/* Profil Kartı */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white text-center">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-blue-600">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </span>
              </div>
              <h2 className="text-2xl mb-1">{formData.firstName} {formData.lastName}</h2>
              <p className="text-blue-100 text-sm">{formData.email}</p>
            </div>

            {/* Üyelik Bilgileri */}
            <div className="p-6 space-y-4">
              <div>
                <div className="text-sm text-zinc-600 mb-1">Üyelik Durumu</div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(memberInfo.status)}`}>
                  {getStatusLabel(memberInfo.status)}
                </span>
              </div>

              <div>
                <div className="text-sm text-zinc-600 mb-1">Üyelik Tipi</div>
                <div className="text-zinc-900">{getMembershipTypeLabel(memberInfo.membershipType)}</div>
              </div>

              <div>
                <div className="text-sm text-zinc-600 mb-1">Üyelik Tarihi</div>
                <div className="text-zinc-900">
                  {new Date(memberInfo.membershipDate).toLocaleDateString('tr-TR')}
                </div>
              </div>

              <div>
                <div className="text-sm text-zinc-600 mb-1">Üyelik Süresi</div>
                <div className="text-zinc-900">
                  {Math.floor((Date.now() - new Date(memberInfo.membershipDate).getTime()) / (1000 * 60 * 60 * 24))} gün
                </div>
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 mt-6">
            <h3 className="mb-4">Okuma İstatistikleri</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-600">Toplam Okunan</span>
                <span className="text-zinc-900">{memberInfo.totalBorrowed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-600">Aktif Ödünç</span>
                <span className="text-zinc-900">{memberInfo.activeBorrowed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-600">Geç İade</span>
                <span className={memberInfo.overdueBooks > 0 ? 'text-red-600' : 'text-green-600'}>
                  {memberInfo.overdueBooks}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Kişisel Bilgiler */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-zinc-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Kişisel Bilgiler</h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Düzenle
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    İptal
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Ad */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-zinc-700 mb-2">
                    <User className="w-4 h-4" />
                    Ad
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.firstName}
                      onChange={(e) => setTempData({ ...tempData, firstName: e.target.value })}
                      className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  ) : (
                    <div className="px-4 py-2.5 bg-zinc-50 rounded-lg text-zinc-900">
                      {formData.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-zinc-700 mb-2">
                    <User className="w-4 h-4" />
                    Soyad
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.lastName}
                      onChange={(e) => setTempData({ ...tempData, lastName: e.target.value })}
                      className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  ) : (
                    <div className="px-4 py-2.5 bg-zinc-50 rounded-lg text-zinc-900">
                      {formData.lastName}
                    </div>
                  )}
                </div>
              </div>

              {/* E-posta */}
              <div>
                <label className="flex items-center gap-2 text-sm text-zinc-700 mb-2">
                  <Mail className="w-4 h-4" />
                  E-posta
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-zinc-50 rounded-lg text-zinc-900">
                    {formData.email}
                  </div>
                )}
              </div>

              {/* Telefon */}
              <div>
                <label className="flex items-center gap-2 text-sm text-zinc-700 mb-2">
                  <Phone className="w-4 h-4" />
                  Telefon
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={tempData.phone}
                    onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-zinc-50 rounded-lg text-zinc-900">
                    {formData.phone}
                  </div>
                )}
              </div>

              {/* Adres */}
              <div>
                <label className="flex items-center gap-2 text-sm text-zinc-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Adres
                </label>
                {isEditing ? (
                  <textarea
                    value={tempData.address}
                    onChange={(e) => setTempData({ ...tempData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-zinc-50 rounded-lg text-zinc-900">
                    {formData.address}
                  </div>
                )}
              </div>
            </div>

            {/* Güvenlik Bölümü */}
            <div className="mt-8 pt-8 border-t border-zinc-200">
              <h3 className="text-xl mb-4">Güvenlik</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors">
                <Shield className="w-4 h-4" />
                Şifre Değiştir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
