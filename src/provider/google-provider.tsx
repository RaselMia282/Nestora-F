"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

type GoogleProviderProps = {
  children: React.ReactNode;
};

const GoogleProvider = ({ children }: GoogleProviderProps) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;
