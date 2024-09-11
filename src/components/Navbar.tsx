import { FaShirt } from "react-icons/fa6";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className='h-14 w-full bg-primary flex items-center justify-center gap-3'>
      <Link href='/' className='flex items-center justify-center gap-3'>
        <FaShirt color='#fff' size={24} />
        <p className='text-white font-bold text-2xl'>Roupa Roupousa</p>
      </Link>
    </nav>
  );
}
