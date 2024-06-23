/* eslint-disable prefer-template */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { TMember } from '@db/discord/type';
import DB from '@db/index';
import dayjs from 'dayjs';

const DIMAS_ID = '525391605062959114';

const chooseIcon = ({
  in_voice, devices, status, id,
}: Pick<TMember, 'in_voice' | 'devices' | 'status' | 'id'>): string => {
  const statuses: Record<string, string> = {
    online: '🟢',
    dnd: '🔴',
    idle: '😴',
    offline: '❌',
  };

  if (in_voice) {
    return `${devices.mobile !== 'offline' && !devices.desktop && !devices.web ? '🗿' : '🚗'}`;
  }

  return status === 'offline' && id === DIMAS_ID ? '❌' : statuses[status];
};

const chooseName = (member: TMember): string => member.custom_name || member.nickname || member.username;

const parseDate = (date: dayjs.Dayjs) => {
  const now = dayjs();
  return {
    days: now.diff(date, 'day'),
    hours: now.diff(date, 'hour') % 24,
    minutes: now.diff(date, 'minute') % 60,
    seconds: now.diff(date, 'second') % 60,
  };
};

const chooseActivity = async ({ activities }: Pick<TMember, 'activities'>, isDebug:boolean = false): Promise<string> => {
  if ((activities ?? []).length === 0) return '';
  const msg: string[] = [];

  for (const activity of activities ?? []) {
    let icons = {
      name: '',
      desc: '',
      state: '',
    };
    await DB.discord.activities.getActivity(activity.id ?? '').then((res) => {
      icons = res ?? { name: '', desc: '', state: '' };
    });
    const times = parseDate(dayjs(activity.createAt * 1000));
    if (isDebug) msg.push(`<b>ID: ${activity.id ?? 'Отсутствует'}</b>`);
    if (activity.name) msg.push(`<b>${icons.name ? icons.name + ' ' : ''}${activity.name}</b>`);
    if (activity.desc) msg.push(`${icons.desc ? icons.desc + ' ' : ''}${activity.desc}`);
    if (activity.state) msg.push(`${icons.state ? icons.state + ' ' : ''}${activity.state}`);
    if (activity.createAt) msg.push(`🕖 ${times.days ? `${times.days}д ` : ''}${times.hours ? `${times.hours}ч ` : ''}${times.minutes ? `${times.minutes}мин ` : ''}${times.seconds ? `${times.seconds}сек` : ''}`);
  }

  return `${msg.join('\n')}`;
};

const lastSeen = (member: TMember) => {
  if (!member.last_seen) return '';
  const times = parseDate(dayjs(member.last_seen * 1000));

  return `\n🐷 ${times.days ? `${times.days}д ` : ''}${times.hours ? `${times.hours}ч ` : ''}${times.minutes ? `${times.minutes}мин ` : ''}${times.seconds ? `${times.seconds}сек` : ''}`;
};
const parseMembers = async (member: TMember, isDebug: boolean = false) => {
  const memberString = [
    chooseIcon(member),
    chooseName(member),
    (member.activities ?? []).length === 0 ? undefined : `\n${await chooseActivity(member, isDebug)}`,
    (member.id === DIMAS_ID && member.last_seen !== -1 ? lastSeen(member) : undefined),
  ].join(' ');

  return memberString;
};

export const generateStatus = async (members: TMember[]):Promise<string> => {
  const isDebug = await DB.self.debug.isDebug();
  const msg: string[] = [];
  const voice = members.filter(({ in_voice }) => in_voice);
  const online = members.filter((member) => !voice.includes(member) && member.status === 'online');
  const dnd = members.filter((member) => !voice.includes(member) && member.status === 'dnd');
  const idle = members.filter((member) => !voice.includes(member) && member.status === 'idle');
  const offline = members.filter((member) => !voice.includes(member) && member.status === 'offline' && member.id === DIMAS_ID);

  for (const member of [...voice, ...online, ...dnd, ...idle, ...offline]) {
    msg.push(await parseMembers(member, isDebug ?? false));
  }

  return msg.join('\n\n');
};
