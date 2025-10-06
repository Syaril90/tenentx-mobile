import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// dashboard
import {
  DashboardSlice,
  createDashboardSlice,
} from '../../features/dashboard/store/dashboardSlice';

// payments (history)
import {
  PaymentsSlice,
  createPaymentsSlice,
} from '../../features/payments/store/paymentSlice';

// pay-now
import {
  PayNowSlice,
  createPayNowSlice,
} from '../../features/payments/paynow/store/payNowSlice';

// announcements
import {
  AnnSlice,
  createAnnouncementsSlice,
} from '../../features/annoucements/store/annoucementsSlice';

// complaints
import {
  ComplaintsSlice,
  createComplaintsSlice,
} from '../../features/complaints/store/complaintsSlice';


// profile
import {
  ProfileSlice,
  createProfileSlice,
} from '../../features/profile/store/profileSlice';

// notifications
import {
  NotificationsSlice,
  createNotificationsSlice,
} from '../../features/notifications/store/notificationsSlice';

// ---- Compose the global store ----
export type AppStore = DashboardSlice & PaymentsSlice & PayNowSlice & AnnSlice & ComplaintsSlice & ProfileSlice & NotificationsSlice;

export const useAppStore = create<AppStore>()(
  devtools((...a) => ({
    ...createDashboardSlice(...a),
    ...createPaymentsSlice(...a),
    ...createPayNowSlice(...a),
    ...createAnnouncementsSlice(...a),
    ...createComplaintsSlice(...a),
    ...createProfileSlice(...a),
    ...createNotificationsSlice(...a),
  })),
);
