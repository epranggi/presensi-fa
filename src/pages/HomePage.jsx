import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600">Presensi Forum Asisten</div>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition duration-300"
            >
              Masuk
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Daftar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Sistem Presensi <span className="text-indigo-600">Forum Asisten</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Solusi digital untuk mencatat kehadiran asisten dengan mudah, cepat, dan terintegrasi. 
              Pantau kehadiran forum asisten secara real-time dan kelola data dengan efisien.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
              >
                Mulai Sekarang
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition duration-300"
              >
                Daftar Akun
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://illustrations.popsy.co/amber/digital-nomad.svg" 
              alt="Ilustrasi Presensi Digital" 
              className="w-full h-auto max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Fitur Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Presensi Real-time</h3>
              <p className="text-gray-600">
                Catat kehadiran asisten secara langsung dengan sistem yang responsif dan akurat.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-blue-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Riwayat Kehadiran</h3>
              <p className="text-gray-600">
                Akses data historis kehadiran asisten kapan saja untuk evaluasi dan pelaporan.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-blue-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Laporan Otomatis</h3>
              <p className="text-gray-600">
                Hasilkan laporan kehadiran secara otomatis dalam berbagai format yang siap digunakan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} Presensi Forum Asisten. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};