'use client';

import { LayoutGrid, UserRound, FolderKanban, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Dock, { type DockItemData } from '@/components/Dock';

export function MobileNav() {
  // Anda bisa mengganti onClick ini untuk navigasi menggunakan Next.js router
  // atau untuk scroll ke section tertentu.
  const items: DockItemData[] = [
    {
      onClick: () => console.log('Home clicked'),
      icon: <LayoutGrid size={24} />,
      label: 'Home'
    },
    {
      onClick: () => console.log('About clicked'),
      icon: <UserRound size={24} />,
      label: 'About'
    },
    {
      onClick: () => console.log('Projects clicked'),
      icon: <FolderKanban size={24} />,
      label: 'Projects'
    },
    {
      onClick: () => console.log('Contact clicked'),
      icon: <Mail size={24} />, // Mail icon is already good
      label: 'Contact'
    }
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
      className="fixed bottom-0 inset-x-0 z-50 md:hidden"
    >
      <Dock items={items} />
    </motion.div>
  );
}