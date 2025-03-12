interface AuthLayoutProps {
    children: React.ReactNode;
    imageSrc: string;
  }
  
  const AuthLayout: React.FC<AuthLayoutProps> = ({ children, imageSrc }) => {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex w-full flex-col-reverse md:flex-row bg-white">
          <div className="w-full px-6 py-12 md:w-1/2 md:px-24 md:py-24">
            {children}
          </div>
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
  