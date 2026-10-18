import { BIZ_PRODUCTS } from '@/content/business';
import { CampaignBanner } from '@/components/shared/CampaignBanner';

export function BusinessBanner() {
  return (
    <CampaignBanner
      image={{ src: '/images/business/business-banner.jpg', width: 2400, height: 511, alt: 'Revolutionize your business with smart automation: integrated software and consultancy to digitize, scale and simplify operations in the GCC.' }}
      hotspot={{ href: '#products', label: 'Explore our solutions', box: { left: '79.6%', top: '67.1%', width: '17.6%', height: '14.5%' } }}
      stripLabel="Business Automation products"
      strip={[
        ...BIZ_PRODUCTS.map((p) => ({ key: p.key, name: p.name, kicker: 'Potentia', text: p.strip, href: `#${p.key}` })),
        { key: 'consult', name: 'Business & IT Consultancy', kicker: 'Expert', text: 'Advice and hands-on help to digitise and adopt.', href: '#biz-consult' },
      ]}
      label="Business Automation"
      title="Software that runs your organisation like clockwork"
      lead="Potentia Campus, Spark and Hive: school management, billing and inventory software on web and mobile, built with bank-grade security."
      actions={<><a href="#products" className="btn">Explore products</a><a href="#demo" className="btn-line">Request a demo</a></>}
    />
  );
}
