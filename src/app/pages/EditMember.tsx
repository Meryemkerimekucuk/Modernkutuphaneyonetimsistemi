import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { members } from '../data/mockData';
import { ArrowLeft, Save } from 'lucide-react';

export function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = members.find(m => m.id === id);

  const [formData, setFormData] = useState(member || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    membershipType: 'public' as 'student' | 'teacher' | 'public',
    status: 'active' as 'active' | 'suspended' | 'expired',
  });

  if (!member) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-xl text-zinc-900 mb-2">Üye bulunamadı</h2>
          <Link to="/members" className="text-zinc-600 hover:underline">Üye listesine dön</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated member:', formData);
    navigate(`/members/${id}`);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to={`/members/${id}`}
          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl text-zinc-900 mb-1">Üye Düzenle</h1>
          <p className="text-zinc-500">{member.firstName} {member.lastName}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg text-zinc-900 mb-6">Kişisel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Ad *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Soyad *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Telefon *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-700 mb-2">Adres *</label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg text-zinc-900 mb-6">Üyelik Bilgisi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Üyelik Tipi *</label>
              <select
                required
                value={formData.membershipType}
                onChange={(e) => setFormData({ ...formData, membershipType: e.target.value as 'student' | 'teacher' | 'public' })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="student">Öğrenci</option>
                <option value="teacher">Öğretmen</option>
                <option value="public">Genel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Durum *</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'suspended' | 'expired' })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="active">Aktif</option>
                <option value="suspended">Askıda</option>
                <option value="expired">Süresi Dolmuş</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <Save className="w-4 h-4" />
            Değişiklikleri Kaydet
          </button>
          <Link
            to={`/members/${id}`}
            className="px-6 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
