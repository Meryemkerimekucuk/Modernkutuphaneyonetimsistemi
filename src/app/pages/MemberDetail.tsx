import { useParams, Link } from 'react-router';
import { members, borrowings, books } from '../data/mockData';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, AlertCircle } from 'lucide-react';

export function MemberDetail() {
  const { id } = useParams();
  const member = members.find(m => m.id === id);
  const memberBorrowings = borrowings.filter(b => b.memberId === id);
  const activeBorrowings = memberBorrowings.filter(b => b.status === 'borrowed' || b.status === 'overdue');

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

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/members"
          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl text-zinc-900 mb-1">Üye Detayı</h1>
          <p className="text-zinc-500">Üye bilgileri ve ödünç geçmişi</p>
        </div>
        <Link
          to={`/members/${member.id}/edit`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Düzenle
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Member Info */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl">
                  {member.firstName[0]}{member.lastName[0]}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl text-zinc-900 mb-1">
                  {member.firstName} {member.lastName}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                    member.status === 'active' ? 'bg-green-50 text-green-700' :
                    member.status === 'suspended' ? 'bg-red-50 text-red-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {member.status === 'active' ? 'Aktif' :
                     member.status === 'suspended' ? 'Askıda' : 'Süresi Dolmuş'}
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                    member.membershipType === 'student' ? 'bg-blue-50 text-blue-700' :
                    member.membershipType === 'teacher' ? 'bg-purple-50 text-purple-700' :
                    'bg-zinc-100 text-zinc-700'
                  }`}>
                    {member.membershipType === 'student' ? 'Öğrenci' :
                     member.membershipType === 'teacher' ? 'Öğretmen' : 'Genel'}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Email</span>
                </div>
                <div className="text-zinc-900">{member.email}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Telefon</span>
                </div>
                <div className="text-zinc-900">{member.phone}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Adres</span>
                </div>
                <div className="text-zinc-900">{member.address}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Üyelik Tarihi</span>
                </div>
                <div className="text-zinc-900">{member.membershipDate}</div>
              </div>
            </div>
          </div>

          {/* Active Borrowings */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-lg text-zinc-900 mb-4">Aktif Ödünçler</h3>
            <div className="space-y-3">
              {activeBorrowings.length > 0 ? (
                activeBorrowings.map(borrowing => {
                  const book = books.find(b => b.id === borrowing.bookId);
                  const isOverdue = borrowing.status === 'overdue';
                  return (
                    <div key={borrowing.id} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
                      <div className="flex-1">
                        <div className="text-sm text-zinc-900 mb-1">{book?.title}</div>
                        <div className="text-xs text-zinc-500">
                          Ödünç: {borrowing.borrowDate} | Son Teslim: {borrowing.dueDate}
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        isOverdue ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {isOverdue ? 'Gecikmiş' : 'Ödünçte'}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-zinc-500">
                  Aktif ödünç kitap bulunmamaktadır
                </div>
              )}
            </div>
          </div>

          {/* Borrowing History */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-lg text-zinc-900 mb-4">Ödünç Geçmişi</h3>
            <div className="space-y-3">
              {memberBorrowings.map(borrowing => {
                const book = books.find(b => b.id === borrowing.bookId);
                return (
                  <div key={borrowing.id} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
                    <div className="flex-1">
                      <div className="text-sm text-zinc-900 mb-1">{book?.title}</div>
                      <div className="text-xs text-zinc-500">
                        {borrowing.borrowDate} - {borrowing.returnDate || 'Devam ediyor'}
                      </div>
                    </div>
                    <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      borrowing.status === 'borrowed' ? 'bg-blue-50 text-blue-700' :
                      borrowing.status === 'returned' ? 'bg-green-50 text-green-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {borrowing.status === 'borrowed' ? 'Ödünçte' :
                       borrowing.status === 'returned' ? 'İade Edildi' : 'Gecikmiş'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-sm text-zinc-500 mb-4">İstatistikler</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-600">Ödünç Kitaplar</span>
                  <span className="text-2xl text-blue-600">{member.borrowedBooks}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-600">Gecikmiş Kitaplar</span>
                  <span className="text-2xl text-red-600">{member.overdueBooks}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-600">Toplam Ödünç</span>
                  <span className="text-2xl text-zinc-900">{memberBorrowings.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {member.overdueBooks > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm text-red-900 mb-1">Gecikmiş İadeler</h3>
                  <p className="text-xs text-red-700">
                    {member.overdueBooks} adet gecikmış kitap iadesi bulunmaktadır.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-sm text-zinc-500 mb-4">Hızlı İşlemler</h3>
            <div className="space-y-2">
              <Link
                to="/borrowings/new"
                className="block w-full px-4 py-2 bg-zinc-900 text-white text-center rounded-lg hover:bg-zinc-800 transition-colors text-sm"
              >
                Kitap Ödünç Ver
              </Link>
              <Link
                to="/returns"
                className="block w-full px-4 py-2 border border-zinc-200 text-zinc-900 text-center rounded-lg hover:border-zinc-900 transition-colors text-sm"
              >
                Kitap İade Al
              </Link>
              <Link
                to={`/members/${member.id}/edit`}
                className="block w-full px-4 py-2 border border-zinc-200 text-zinc-900 text-center rounded-lg hover:border-zinc-900 transition-colors text-sm"
              >
                Bilgileri Düzenle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
