import { getTorrentUuid } from '../../helpers/torrent';
import transmission from '../../services/transmission';

export default class Handler {
  private currFeed: number[] = [];

  public async run(): Promise<void> {
    const { torrents } = await transmission.getAllData();

    const ids = torrents.map((t) => ({
      id: t.id,
      name: t.name,
      p: t.queuePosition,
      uuid: getTorrentUuid(t),
    }));

    console.log(ids);
    this.currFeed.push(1);
    return;
  }
}
