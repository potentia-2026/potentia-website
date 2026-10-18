import { CampaignBanner } from '@/components/shared/CampaignBanner';
import { EDU_STRIP } from '@/content/education';

export function EducationBanner() {
  return (
    <CampaignBanner
      image={{ src: '/images/education/education-banner.jpg', width: 2400, height: 511, alt: 'Empowering academic excellence and career success: structured intervention, career coaching and support built around GCC requirements.' }}
      hotspot={{ href: '#enquire', label: 'Partner with us', box: { left: '79.6%', top: '67.1%', width: '17.6%', height: '14.5%' } }}
      stripLabel="Education and Wellbeing programmes"
      strip={EDU_STRIP}
      label="Education & Wellbeing"
      title="Supporting every learner, from first classroom to first career"
      lead="Psychology-led programmes for students, parents, teachers and professionals, built around GCC school requirements."
      actions={<><a href="#programmes" className="btn">Explore programmes</a><a href="#enquire" className="btn-line">Enquire now</a></>}
    />
  );
}
