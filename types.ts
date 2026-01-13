export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export enum AttendanceStatus {
  ACCEPT = 'accept',
  DECLINE = 'decline'
}

export interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  description: string;
  icon: string;
  image?: string;
}
