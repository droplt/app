import transmission from '../../services/transmission';

export default class SyncHandler {
  private currFeed: number[] = [];

  public async run(): Promise<void> {
    const torrents = await transmission.get(null, [
      'status',
      'hashString',
      'name',
    ]);

    console.log(torrents);
    console.log('run', this.currFeed.length);
    this.currFeed.push(1);
    return;
  }
}
