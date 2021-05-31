export default class TransmissionSync {
  private currFeed: number[] = [];

  public async run(): Promise<void> {
    console.log('run', this.currFeed.length);
    this.currFeed.push(1);
    return;
  }
}
