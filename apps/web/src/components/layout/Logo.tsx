import Image from 'next/image';
import { COMPANY } from '@/content/site';

export function Logo({ className = 'h-[54px] w-auto max-sm:h-11' }: { className?: string }) {
  return <Image src="/brand/potentia-logo.png" alt={COMPANY.name} width={382} height={110} priority className={className} />;
}
