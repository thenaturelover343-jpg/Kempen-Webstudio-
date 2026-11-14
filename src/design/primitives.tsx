// Statische vervanging van src/components/MotionPrimitives.tsx uit het design.
// Zelfde opmaak (className's), maar zonder React in de browser: de animatie zit in CSS-klassen
// (kw-load = bij het laden, kw-fade/kw-sec/kw-sg = bij het in beeld komen, via site.js). Alleen transform/opacity.
import type { CSSProperties, ReactNode, JSX } from 'react';

export const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ');
type Tag = keyof JSX.IntrinsicElements;
const v = (o: Record<string, string | number | undefined>) => o as unknown as CSSProperties;

export function FadeIn({ children, className = '', delay = 0, y = 20, duration = 0.6, immediate = false, as = 'div', id }: {
  children: ReactNode; className?: string; delay?: number; y?: number; duration?: number; immediate?: boolean; as?: Tag; id?: string;
}) {
  const T = as as any;
  return <T id={id} className={cx(immediate ? 'kw-load' : 'kw-fade', className)} style={v({ '--d': delay ? `${delay}s` : undefined, '--y': y !== 20 ? `${y}px` : undefined, '--dur': duration !== 0.6 ? `${duration}s` : undefined })}>{children}</T>;
}

/** motion.* met initial/animate (bij laden): zelfde element, met de laad-animatie */
export function Load({ children, className = '', delay = 0, y = 20, duration = 0.6, scale = false, as = 'div', ...rest }: {
  children?: ReactNode; className?: string; delay?: number; y?: number; duration?: number; scale?: boolean; as?: Tag; [k: string]: any;
}) {
  const T = as as any;
  return <T {...rest} className={cx(scale ? 'kw-load-s' : 'kw-load', className)} style={v({ '--d': delay ? `${delay}s` : undefined, '--y': `${y}px`, '--dur': `${duration}s` })}>{children}</T>;
}

export function StaggerGroup({ children, className = '', immediate = false, as = 'div', ...rest }: { children: ReactNode; className?: string; immediate?: boolean; as?: Tag; [k: string]: any }) {
  const T = as as any;
  return <T {...rest} className={cx('kw-sg', immediate && 'kw-load-g kw-in', className)}>{children}</T>;
}

export function StaggerItem({ children, className = '', i = 0, as = 'div', ...rest }: { children: ReactNode; className?: string; i?: number; as?: Tag; [k: string]: any }) {
  const T = as as any;
  return <T {...rest} className={cx('kw-si', className)} style={v({ '--i': i })}>{children}</T>;
}

export function SectionReveal({ children, id, className = '', immediate = false, ...rest }: { children: ReactNode; id?: string; className?: string; immediate?: boolean; [k: string]: any }) {
  return <section {...rest} id={id} className={cx(immediate ? 'kw-load' : 'kw-sec', className)} style={immediate ? v({ '--y': '14px', '--dur': '.55s' }) : undefined}>{children}</section>;
}

/** Ruwe HTML uit de bron (zinnen met links, opmaak) letterlijk overnemen */
export function Html({ html, as = 'span', className, ...rest }: { html: string; as?: Tag; className?: string; [k: string]: any }) {
  const T = as as any;
  return <T {...rest} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Knop of link: in het design zijn veel CTA's <button onClick>. Hier altijd een echte link (werkt zonder JS);
 *  data-chat opent het contactvenster (zoals onOpenChat in het design). */
export function A({ href, children, className, chat, subject, newTab, ...rest }: {
  href: string; children: ReactNode; className?: string; chat?: boolean; subject?: string; newTab?: boolean; [k: string]: any;
}) {
  return <a href={href} className={className} data-chat={chat ? '' : undefined} data-subject={subject || undefined}
    target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener' : undefined} {...rest}>{children}</a>;
}

/** Selectie (slider, keuze-element): data-on/data-off klassen worden door site.js gewisseld */
export const sel = (active: boolean, on: string, off: string, base = '') => ({
  className: cx(base, active ? on : off), 'data-on': on, 'data-off': off,
});
