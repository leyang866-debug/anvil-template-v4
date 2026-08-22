import type { Article } from './articles';
export type Locale='en'|'ru'|'de'|'ja';
export function localizeArticle(article:Article, locale:string){return {...article,labels:{guide:'GUIDE',quick:'THIS CHAPTER',practical:'Practical guidance',continue:'Continue',back:'Home'},locale};}
