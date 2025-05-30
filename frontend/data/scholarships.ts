export interface Scholarship {
  id: string;
  name: string;
  organization: string;
  amount: string;
  deadline: string;
  description: string;
}

export const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Tech Innovators Scholarship',
    organization: 'Future Tech Leaders',
    amount: '$10,000',
    deadline: '2024-12-15',
    description: 'A scholarship for students pursuing degrees in computer science, engineering, or related fields, who demonstrate a passion for innovation and technology.',
  },
  {
    id: '2',
    name: 'Creative Arts Grant',
    organization: 'Arts Foundation',
    amount: '$5,000',
    deadline: '2025-01-31',
    description: 'Awarded to talented students in visual arts, performing arts, or creative writing, to support their artistic endeavors.',
  },
  {
    id: '3',
    name: 'Community Changemakers Award',
    organization: 'Social Impact Initiative',
    amount: '$7,500',
    deadline: '2024-11-30',
    description: 'Recognizing students who have made significant contributions to their communities through volunteer work or social projects.',
  },
  {
    id: '4',
    name: 'Environmental Stewardship Scholarship',
    organization: 'Green Future Fund',
    amount: '$8,000',
    deadline: '2025-03-01',
    description: 'Supporting students dedicated to environmental science, sustainability, or conservation efforts.',
  },
];
