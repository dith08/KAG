interface AuthLayoutProps {
  children: React.ReactNode;
  imageSrc: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, imageSrc }) => {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div className="relative flex min-h-screen items-center justify-cente">
      {/* Background image di mobile */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={imageSrc}
          alt="Auth background"
          className="object-cover w-full h-full opacity-15"
        />
      </div>

      {/* Konten utama */}
      <div className="relative flex w-full flex-col-reverse md:flex-row">
        {/* Form */}
        <div
          className={`w-full px-6 py-12 md:w-1/2 md:px-24 ${
            isLoginPage ? "md:py-24" : "md:py-15"
          } bg-white/0 md:bg-white rounded-md`}
        >
          {children}
        </div>

        {/* Background image di desktop */}
        <div className="hidden md:block w-full md:w-1/2">
          <img
            src={imageSrc}
            alt="Auth visual"
            className="object-cover w-full h-screen"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
