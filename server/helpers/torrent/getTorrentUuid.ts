import { NormalizedTorrent } from '@ctrl/shared-torrent';
import { NIL, v5 } from 'uuid';

const getTorrentUuid = (torrent: NormalizedTorrent): string => {
  const { name, totalSize } = torrent;
  return v5(`${name}-${totalSize}`, NIL);
};

export default getTorrentUuid;
