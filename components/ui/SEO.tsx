import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  isFrench?: boolean;
  descriptionEn?: string;
  descriptionFr?: string;
  image?: string;
  url?: string;
  type?: string;
  isHomePage?: boolean;
  noindex?: boolean;
}

const SEO = ({
  title = 'Metabole - Creative Studio Paris | Metabole STUDIO',
  isFrench = false,
  descriptionEn = 'Metabole is a creative studio based in Paris, France, founded by Matteo COURQUIN and Jérôme BEZEAU. Metabole STUDIO creates unique web experiences for brands and agencies.',
  descriptionFr = 'Metabole est un studio créatif basé à Paris, France, fondé par Matteo COURQUIN et Jérôme BEZEAU. Metabole STUDIO crée des expériences web uniques pour les marques et les agences.',
  image = '/og-image.png',
  url = 'https://metabole.studio',
  type = 'website',
  isHomePage = false,
  noindex = false,
}: SEOProps) => {
  const { asPath } = useRouter();
  const description = isFrench ? descriptionFr : descriptionEn;
  const lang = isFrench ? 'fr' : 'en';

  return (
    <Head>
      <title>{title}</title>
      <meta content={lang} name="language" />
      <meta content={lang} httpEquiv="content-language" />
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content={description} name="description" />
      <meta content="telephone=no" name="format-detection" />
      <meta content="default" name="referrer" />

      {/* Indexation contrôlée */}
      <meta content={noindex ? 'noindex, nofollow' : 'index, follow'} name="robots" />

      {/* Canonical link */}
      <link key="canonical" href={'https://metabole.studio' + asPath} rel="canonical" />

      {/* OpenGraph Tags */}
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={`${url}${image}`} property="og:image" />
      <meta content={url} property="og:url" />
      <meta content={type} property="og:type" />
      <meta content="Metabole STUDIO" property="og:site_name" />
      <meta content={isFrench ? 'fr_FR' : 'en_US'} property="og:locale" />

      {/* Twitter Card */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={`${url}${image}`} name="twitter:image" />

      {/* Google verification - Uncomment when ready */}
      <meta content="XyGSPQ3t1FMXH4Xl-yEoWbFEElAi0d2FaE5MN8t4UhU" name="google-site-verification" />

      {/* Keywords - Optimisé pour "metabole" et "metabole studio" */}
      <meta
        content="metabole, Metabole, METABOLE, metabole studio, Metabole STUDIO, studio metabole, creative studio, Paris, France, Matteo COURQUIN, Jérôme BEZEAU, websites, sites, web, web experiences, design, development, animation, 3D, nextjs, gsap, threejs, unique, brands, agencies, studio créatif, expériences web"
        name="keywords"
      />

      {/* Favicon */}
      <link href="/favicon.ico" rel="icon" />

      {/* Hreflang - Gestion spéciale pour la page d'accueil */}
      {isHomePage ? (
        <>
          <link href="https://metabole.studio/fr" hrefLang="fr" rel="alternate" />
          <link href="https://metabole.studio/en" hrefLang="en" rel="alternate" />
          <link href="https://metabole.studio" hrefLang="x-default" rel="alternate" />
        </>
      ) : (
        <link
          href={`${url}${isFrench ? '/fr' : '/en'}`}
          hrefLang={isFrench ? 'fr' : 'en'}
          rel="alternate"
        />
      )}
    </Head>
  );
};

export default SEO;
