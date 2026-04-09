export type AlertTextType = 'Alerts Text' | 'Alerts Plain Text' | 'Image';

export interface AlertComponent {
  widget: 'Header' | 'Body' | 'Footer';
  type: AlertTextType;
  subType: 'Pageheader' | 'Body' | 'Subheader' | 'Footnote' | 'logos' | 'icons';
  textList: string[];
}

export interface TemplateSchema {
  branding: string;
  language: string;
  angAssetsPath: string;
  customerTrackingUrl: string;
  headerBGColor: string;
  alertComponents: AlertComponent[];
  appWidgetData: null | Record<string, unknown>;
}

export type SectionType = 'Header' | 'Body' | 'Footer';
export type InspectorTab = 'content' | 'style' | 'metadata' | 'validation';

export const DEFAULT_SCHEMA: TemplateSchema = {
  branding: 'RETAIL',
  language: 'ENG',
  angAssetsPath: 'https://www.wellsfargomedia.com',
  customerTrackingUrl: 'https://tracking.example.com/pixel.gif',
  headerBGColor: '#F4F0ED',
  alertComponents: [
    { widget: 'Header', type: 'Alerts Text', subType: 'Pageheader', textList: ["You're prequalified for an auto loan!"] },
    { widget: 'Header', type: 'Alerts Text', subType: 'Body', textList: ['Wells Fargo Dec 21 to Pat.Smith'] },
    { widget: 'Header', type: 'Image', subType: 'logos', textList: ['Wells Fargo and Volkswagen Retail Finance logos'] },
    { widget: 'Body', type: 'Alerts Text', subType: 'Pageheader', textList: ["You're prequalified for up to $57,000"] },
    { widget: 'Body', type: 'Alerts Text', subType: 'Body', textList: ['Your prequalification ID: XXXXXXX'] },
    { widget: 'Body', type: 'Alerts Text', subType: 'Body', textList: ['Valid until MM/DD/YYYY'] },
    { widget: 'Body', type: 'Alerts Text', subType: 'Body', textList: ['Visit any VW dealership to take the next step in your car buying'] },
    { widget: 'Body', type: 'Alerts Text', subType: 'Subheader', textList: ['Dirito Brothers Walnut Creek Volkswagen'] },
    { widget: 'Body', type: 'Alerts Text', subType: 'Body', textList: ['2020 N Main St'] },
    { widget: 'Body', type: 'Alerts Text', subType: 'Body', textList: ['Walnut Creek, CA 94596'] },
    { widget: 'Body', type: 'Alerts Text', subType: 'Body', textList: ['(925) 934-8224'] },
    { widget: 'Footer', type: 'Image', subType: 'icons', textList: ['Home icon'] },
    { widget: 'Footer', type: 'Alerts Text', subType: 'Subheader', textList: ['Wells Fargo Auto'] },
    { widget: 'Footer', type: 'Alerts Text', subType: 'Footnote', textList: ['Wells Fargo Auto is a division of Wells Fargo Bank, N.A. The Vol'] },
    { widget: 'Footer', type: 'Alerts Text', subType: 'Footnote', textList: ['Please do not reply to this automated email.'] },
    { widget: 'Footer', type: 'Alerts Text', subType: 'Footnote', textList: ['2df9870d-b8bf-4401-8a19-1a31d97961b9'] },
  ],
  appWidgetData: null,
};

export function getComponentLabel(comp: AlertComponent): string {
  if (comp.type === 'Image') {
    if (comp.subType === 'logos') return 'Brand Logos';
    if (comp.subType === 'icons') return 'Footer Icon';
    return 'Image Asset';
  }
  if (comp.subType === 'Pageheader') return 'Page Header Title';
  if (comp.subType === 'Body') return 'Supporting Copy';
  if (comp.subType === 'Subheader') return 'Section Heading';
  if (comp.subType === 'Footnote') return 'Legal Footnote';
  return comp.subType;
}

export function getValidationState(comp: AlertComponent): { status: 'valid' | 'warning' | 'error'; message?: string } {
  const text = comp.textList.join(' ').trim();
  if (!text) return { status: 'error', message: 'Content is empty' };
  if (comp.type === 'Image' && !text) return { status: 'error', message: 'Asset reference incomplete' };
  if (comp.subType === 'Pageheader' && text.length > 80) return { status: 'warning', message: 'May overflow in rendered email' };
  if (comp.subType === 'Footnote' && text.length < 5) return { status: 'error', message: 'Legal copy missing' };
  if (comp.subType === 'Body' && text.length > 200) return { status: 'warning', message: 'Consider breaking into shorter lines' };
  return { status: 'valid' };
}
