export interface SiteConfig { name: string; shortName: string; description: string; domain: string; tagline: string; legalNotice: string; social: Record<string,string>; game: Record<string,string>; ogImageWidth: number; ogImageHeight: number; defaultAuthor?: string; }
export const site: SiteConfig = { name:'Zombie Combat Field Manual', shortName:'Combat Wiki', description:'Reusable guide template for zombie combat and survivor-like games.', domain:'example-game.invalid', tagline:'Survive the horde. Build the run.', legalNotice:'A fan-made community resource. Replace this notice for your game.', social:{}, game:{name:'Your Zombie Combat Game',platform:'PC / Console',developer:'Your Studio',publisher:'Your Publisher',genre:'Zombie combat roguelite'}, ogImageWidth:1200, ogImageHeight:630, defaultAuthor:'Community Guide Team' };
export const siteUrl = `https://${site.domain}`;
export const ga4MeasurementId = '';
export const googleSiteVerification = '';
