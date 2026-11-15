// Render-startpunt voor de build (Node): zet een paginamodel om naar de HTML van <body>. React draait alleen hier,
// tijdens de build; in de browser komt alleen statische HTML + site.js.
import { renderToStaticMarkup } from 'react-dom/server';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChatModal } from './Contact';
import { CookieBanner, FloatingCta, ScrollProgressBar } from './Chrome';
import { Home } from './Home';
import { Blocks, PageHero } from './Blocks';

function Layout({ s, f, chatTitle, children }: { s: any; f: any; chatTitle: string; children: any }) {
  const cta = s.cta || s.floating[0] || { label: 'Contact', href: '/#contact' };
  return (
    <>
      <a href="#main" className="kw-skip rounded-full bg-[#121214] text-white px-4 py-2 text-[13px] font-medium">{s.skip}</a>
      <ScrollProgressBar />
      <div id="top" className="min-h-screen w-full hero-canvas flex flex-col justify-between overflow-x-hidden">
        <Header s={s} />
        <main id="main" className="flex-1 w-full">{children}</main>
        <Footer s={s} cta={cta} />
      </div>
      <FloatingCta s={s} />
      {f && <ChatModal f={f} s={s} title={chatTitle} />}
      <CookieBanner s={s} />
    </>
  );
}

export function renderHome(m: any) {
  return renderToStaticMarkup(<Layout s={m.s} f={m.f} chatTitle={m.chatTitle}><Home h={m.h} s={m.s} f={m.f} x={m.x} /></Layout>);
}

export function renderPage(m: any) {
  return renderToStaticMarkup(
    <Layout s={m.s} f={m.f} chatTitle={m.chatTitle}>
      <div className="w-full overflow-x-hidden">
        {m.hero && <PageHero h={m.hero} ui={m.s.ui} />}
        <Blocks blocks={m.blocks} s={m.s} f={m.f} />
      </div>
    </Layout>
  );
}
