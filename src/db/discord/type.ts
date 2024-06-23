export type TActivity = {
  id: string | null;
  name: string;
  desc: string;
  state: string;
  createAt: number;
};

export type TStatus = 'online' | 'dnd' | 'idle' | 'invisible' | 'offline';

export type TMember = {
  id: string;
  username: string;
  nickname: string;
  hide_nick: boolean;
  custom_name?: string;
  status: TStatus
  last_seen?: number;
  devices: {
    desktop?: TStatus,
    mobile?: TStatus,
    web?: TStatus
  },
  in_voice: boolean;
  activities: TActivity[] | null;
  telegram: string | null;
};
