import React, {useEffect, useState} from 'react';
import { Header } from '../organisms/Header/Header';
import { Footer } from '../organisms/Footer/Footer';

interface LayoutProps {
  component: React.ReactNode;
  variant?: 'grow' | 'flex';
}

export const Layout: React.FC<LayoutProps> = ({ component, variant = 'flex'}) => {
  const [isFlex, setIsFlex] = useState(false);
  useEffect(() => {
    if (variant === 'flex') {
      setIsFlex(true);
    } else {
      setIsFlex(false);
    }
  },[variant]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`grow${isFlex ? ' flex flex-col justify-center items-center' : ''}`}>{component}</main>
      <Footer />
    </div>
  );
};
