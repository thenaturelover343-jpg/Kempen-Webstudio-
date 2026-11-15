// Foto: vult een beeldvak met een beeld uit src/site/fotos.mjs (AVIF + WebP, srcset, vaste maten tegen CLS).
import { foto } from '../site/fotos.mjs';

export function Foto({ id, vorm, lang, sizes, className, eager, decorative }: { id: string; vorm: string; lang?: string; sizes: string; className?: string; eager?: boolean; decorative?: boolean }) {
  const f = foto(id, vorm, lang || 'nl');
  return (
    <picture>
      <source type="image/avif" srcSet={f.avif} sizes={sizes} />
      <img src={f.src} srcSet={f.webp} sizes={sizes} width={f.width} height={f.height} alt={decorative ? '' : f.alt}
        loading={eager ? undefined : 'lazy'} decoding="async" draggable={false}
        className={className || 'block w-full h-full object-cover'} />
    </picture>
  );
}
