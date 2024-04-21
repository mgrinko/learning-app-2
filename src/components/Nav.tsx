'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Nav = () => {
  const pathname = usePathname();

  const links = [
    ['/dashboard', 'Dashboard'],
    ['/tasks', 'Tasks'],
    ['/users', 'Users'],
    ['/learning-materials', 'Materials'],
  ];

  return (
    <nav
      className="
        min-h-screen py-4
        bg-sky-950 text-slate-100
        font-medium text-lg leading-none
        grid gap-y-1 content-start
      "
    >
      {links.map(([href, title]) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'block py-2 px-5 transition-color duration-200 hover:bg-sky-700',
            {
              'underline underline-offset-4 decoration-1':
                pathname.startsWith(href),
            },
          )}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
};
