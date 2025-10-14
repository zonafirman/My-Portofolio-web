// app/fonts.ts
import localFont from 'next/font/local';

// Definisikan font Satoshi dengan berbagai weight
export const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi', // Opsional: untuk digunakan dengan variabel CSS
  display: 'swap', // Menjamin teks tetap terlihat saat font dimuat
});
