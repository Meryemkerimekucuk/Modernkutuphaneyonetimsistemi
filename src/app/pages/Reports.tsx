import { FileBarChart, Download, Calendar, Filter } from 'lucide-react';
import { stats } from '../data/mockData';

const reportTypes = [
  { id: 'borrowings', name: 'Ödünç Raporu', description: 'Belirli tarih aralığındaki ödünç işlemleri' },
  { id: 'members', name: 'Üye Raporu', description: 'Üye kayıt ve aktivite raporu' },
  { id: 'popular', name: 'Popüler Kitaplar', description: 'En çok ödünç alınan kitaplar' },
  { id: 'overdue', name: 'Gecikme Raporu', description: 'Geç iade ve ceza raporu' },
  { id: 'inventory', name: 'Envanter Raporu', description: 'Kitap stok ve durum raporu' },
  { id: 'financial', name: 'Finansal Rapor', description: 'Ceza ve gelir raporu' },
];

export function Reports() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl text-zinc-900 mb-1">Raporlar</h1>
        <p className="text-zinc-500">Kütüphane aktivite raporlarını görüntüleyin ve indirin</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-sm text-zinc-500 mb-1">Bu Ay Ödünç</div>
          <div className="text-2xl text-zinc-900">234</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-sm text-zinc-500 mb-1">Yeni Üye</div>
          <div className="text-2xl text-zinc-900">47</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-sm text-zinc-500 mb-1">Toplam Ceza</div>
          <div className="text-2xl text-zinc-900">₺{stats.totalFines}</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-sm text-zinc-500 mb-1">İade Oranı</div>
          <div className="text-2xl text-zinc-900">94%</div>
        </div>
      </div>

      {/* Report Generator */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg text-zinc-900 mb-4">Rapor Oluştur</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-700 mb-2">Rapor Tipi</label>
            <select className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900">
              <option value="">Rapor seçin</option>
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-700 mb-2">Başlangıç Tarihi</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-700 mb-2">Bitiş Tarihi</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors">
          <Download className="w-4 h-4" />
          Rapor İndir (PDF)
        </button>
      </div>

      {/* Report Templates */}
      <div>
        <h2 className="text-lg text-zinc-900 mb-4">Hazır Rapor Şablonları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report) => (
            <div key={report.id} className="bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-900 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileBarChart className="w-6 h-6 text-zinc-900" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base text-zinc-900 mb-1">{report.name}</h3>
                  <p className="text-sm text-zinc-500 mb-4">{report.description}</p>
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    İndir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
