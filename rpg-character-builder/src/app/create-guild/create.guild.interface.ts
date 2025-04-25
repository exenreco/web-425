export interface Guild {
  id:                     number;
  name:                   string;
  type:                   'Competitive' | 'Casual' | 'Social' | 'Educational';
  terms:                  boolean;
  description:            string;
  notificationPreference: 'Email' | 'SMS' | 'In-App';
}
