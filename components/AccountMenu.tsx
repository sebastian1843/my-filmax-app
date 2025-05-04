import { signOut } from 'next-auth/react';
import React from 'react';
import Image from 'next/image'; // ✅ Importar el componente optimizado

import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image // ✅ Reemplazo de <img>
            src="/images/default-blue.png"
            alt="Profile"
            width={32} // Equivalente a Tailwind w-8
            height={32}
            className="rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {currentUser?.name}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
        Sign out of Netflix
      </div>
    </div>
  );
}

export default AccountMenu;
