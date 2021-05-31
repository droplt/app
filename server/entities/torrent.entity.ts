import { Collection, getRepository } from 'fireorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('Torrent')
@Collection('Torrents')
export class TorrentModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

export const torrentRepository = getRepository(TorrentModel);
