import type { Facility, FacilitySlot } from '../../../types';

export const mockFacilities: Facility[] = [
  {
    id: 'f_gym',
    name: 'Gym',
    category: 'sports',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNlI26HzBMdOTr9_Xcq6u9lGK8mGFPSkr0K25LM2Qa_dxZDJtK0aiKriXeSg_rM7JAIOu5VdvS9W1huCUamDfdFv7DrFCUSwSDIKPrbFevTY7QxuoQrXO7R45hNQpsz-j7lhe8oH7MqEbu_3_DQ4jkndAQMh6Lb1NAM23SFf2zzi3NFgDgwWUuGpfR6RsGdXzoIesTdrIQvebTfqdL1gwkaEQStJ08y2Za1KEEFPDPaHQAeavd_jseW28eeWqebTSj73hSze5fqOeE',
    rules: ['Max 1 hour per booking', 'Bring towel & wipe equipment', 'Proper attire required'],
    capacityLabel: 'Max 20 persons',
    feeLabel: 'Free for residents',
  },
  {
    id: 'f_pool',
    name: 'Swimming Pool',
    category: 'sports',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCt7WZ31BxFcy9NByQfRd8cmeYlrRk9SXVYIcqeTpimKB7uEgJzJiPKXLTbao4bPHW2fhTczBJy5DyWtjXZJqbt-3eIqbvkS3CjPeegMIR5F9jQUvFZNEgcR6B6ohE4bz3ZPSU4ESMRvzN0dlLLDC_j-ezbHKGdGnRzvH1JSfUqdkIsolUvfgthJI_0GkRRwo29pGnvclx8u_UChBeY31IpLzLHjtp3-oh7B_ueizW5VwJB9fRCvjTF-4fNHC2iRemZ5DSHrbAH7shO',
    rules: ['Max 2 hours per booking', 'Proper swimwear required', 'No food or drinks in pool area'],
    capacityLabel: 'Max 15 persons',
    feeLabel: 'Free for residents',
  },
  {
    id: 'f_func_a',
    name: 'Function Room A',
    category: 'social',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMNg27_sKXOkLYsrsbgCMrDjE-dHyqL34uu9cvDY3KLatDKm_SnpJEeoHcRSrYpJEvO69ne1gi1_qbENAYfBaOH4kzNhFNSvYhdcsJGRs_qAe6-4VhaFCtwSqzRVQLArfYbNeBvGYPkpx5wwGmMHNKYxwgzg7YGE_RxkhHsj0YwKot21WXMlEMm6VkG1VDZlrMp2zYAIgyxcKAyRlz8Ndokqm-WeN_XCIbE7cjEFoEWR0hxhDEs_Vh-u5SjpfRxL-vvnzx12yahsU5',
    rules: ['Max 4 hours per booking', 'Keep volume reasonable', 'Return room to original setup'],
    capacityLabel: 'Up to 40 pax',
    feeLabel: '₱500 / hour',
  },
  {
    id: 'f_bbq',
    name: 'BBQ Area',
    category: 'social',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJV5vcBu3X2eVxGjOirRU-teDZzRxQvF0lFohxGHG7G9ktyJ5Dj0N6SCxuVF-4VInQKhbpkv0WLSMpYbCf1zvd5PyLSjpRIQKatkq4_G0YYSrJd9OwKVHVwsWRMVMB8YmtShr25iPVA88fjzpeRmgSSkDMOqw4EJ3Hrc2MG78wHCJAvpc7P0DYnDG2Ul9zOOko35dkUa8Cm6qj4NAu3MUzTZe7W-sXVj4V5u9UmracFnCYV_1LUpRTh4WLh74OxR2RN7K34SxJOEkU',
    rules: ['Clean grill after use', 'No loud music after 10pm', 'Dispose trash properly'],
    capacityLabel: 'Up to 10 pax',
    feeLabel: '₱300 / session',
  },
];

export const mockSlots = (dateISO: string): FacilitySlot[] => [
  { id: `${dateISO}T09:00/10:00`, dateISO, label: '09:00 - 10:00' },
  { id: `${dateISO}T10:00/11:00`, dateISO, label: '10:00 - 11:00' },
  { id: `${dateISO}T11:00/12:00`, dateISO, label: '11:00 - 12:00', disabled: true },
  { id: `${dateISO}T14:00/15:00`, dateISO, label: '14:00 - 15:00' },
  { id: `${dateISO}T15:00/16:00`, dateISO, label: '15:00 - 16:00', disabled: true },
  { id: `${dateISO}T16:00/17:00`, dateISO, label: '16:00 - 17:00' },
];

export const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));
