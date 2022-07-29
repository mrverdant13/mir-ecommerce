import React from 'react';
import SignUpForm from '../components/SignUpForm';
import { SignUpProvider } from '../context/signUp';

export default function SignUpPage() {
  return (
    <SignUpProvider>
      <SignUpForm />
    </SignUpProvider>
  );
}
