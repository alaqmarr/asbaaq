import RegisterForm from '@/components/auth/RegisterForm';
import React from 'react';

const RegisterPage = () => {
  return (
    <main className="flex flex-col items-center justify-center p-4 sm:mt-16 md:mt-16">
      <div
        className="w-full max-w-2xl p-6 rounded-lg shadow-md overflow-y-auto max-h-[90vh]"
      >
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
