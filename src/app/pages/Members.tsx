import { useState } from 'react';
import { Link } from 'react-router';
import { members } from '../data/mockData';
import { Search, Users, Eye, Edit, Trash2, UserPlus } from 'lucide-react';

export function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeMembers = members.filter(m => m.status === 'active').length;
  const suspendedMembers = members.filter(m => m.status === 'suspended').length;
  const totalBorrowed = members.reduce((sum, m) => sum + m.borrowedBooks, 0);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl text-zinc-900 mb-1">Üyeler</h1>
          <p className="text-zinc-500">Kütüphane üyelerini yönetin</p>
        </div>
        <Link
          to="/members/add"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Yeni Üye Ekle
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-zinc-200 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Üye ara (ad, soyad, email, telefon)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="suspended">Askıya Alınmış</option>
            <option value="expired">Süresi Dolmuş</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-zinc-900 mb-1">{members.length}</div>
          <div className="text-sm text-zinc-500">Toplam Üye</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-green-600 mb-1">{activeMembers}</div>
          <div className="text-sm text-zinc-500">Aktif Üye</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-red-600 mb-1">{suspendedMembers}</div>
          <div className="text-sm text-zinc-500">Askıda</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-blue-600 mb-1">{totalBorrowed}</div>
          <div className="text-sm text-zinc-500">Ödünç Kitap</div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Üye Bilgileri</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">İletişim</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Üyelik Tipi</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Durum</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Ödünç</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Gecikmiş</th>
                <th className="text-right px-6 py-4 text-sm text-zinc-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                        <span className="text-white text-sm">
                          {member.firstName[0]}{member.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm text-zinc-900 mb-1">
                          {member.firstName} {member.lastName}
                        </div>
                        <div className="text-xs text-zinc-500">
                          Üyelik: {member.membershipDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-zinc-900 mb-1">{member.email}</div>
                    <div className="text-xs text-zinc-500">{member.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      member.membershipType === 'student' ? 'bg-blue-50 text-blue-700' :
                      member.membershipType === 'teacher' ? 'bg-purple-50 text-purple-700' :
                      'bg-zinc-100 text-zinc-700'
                    }`}>
                      {member.membershipType === 'student' ? 'Öğrenci' :
                       member.membershipType === 'teacher' ? 'Öğretmen' : 'Genel'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      member.status === 'active' ? 'bg-green-50 text-green-700' :
                      member.status === 'suspended' ? 'bg-red-50 text-red-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {member.status === 'active' ? 'Aktif' :
                       member.status === 'suspended' ? 'Askıda' : 'Süresi Dolmuş'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-zinc-900">{member.borrowedBooks}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm ${member.overdueBooks > 0 ? 'text-red-600' : 'text-zinc-600'}`}>
                      {member.overdueBooks}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/members/${member.id}`}
                        className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/members/${member.id}/edit`}
                        className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          Aramanıza uygun üye bulunamadı
        </div>
      )}
    </div>
  );
}
