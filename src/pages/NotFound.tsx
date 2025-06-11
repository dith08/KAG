  const NotFound = () => {


    return (
      <div className="min-h-screen flex items-center justify-center bg-green-900">
        <div className="text-center p-8 bg-green-800 rounded-lg shadow-xl">
          <h1 className="text-6xl font-bold text-green-100 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-green-200 mb-2">Page Not Found</h2>
          <p className="text-green-300">Please login first...</p>
          <div className="mt-6">
            <a href="/login" className="inline-block px-6 py-2 bg-green-600 text-green-100 rounded hover:bg-green-700 transition-colors">
              Login
            </a>
            <div className="mt-4 animate-pulse bg-green-700 h-1 w-24 mx-auto rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  export default NotFound;