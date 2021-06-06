import { ITorrentModel } from '../../entities';

export const TRANSMISSION_TO_ENTITY_MAP: Record<keyof ITorrentModel, string> = {
  hashString: 'id',
  name: 'name',
  status: 'status',
};
