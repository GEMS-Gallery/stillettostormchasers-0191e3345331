import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Hunter {
  'id' : HunterID,
  'name' : string,
  'heelHeight' : bigint,
}
export type HunterID = bigint;
export interface Mission {
  'id' : bigint,
  'hurricaneName' : string,
  'date' : string,
  'hunterID' : HunterID,
}
export interface _SERVICE {
  'addHunter' : ActorMethod<[string, bigint], HunterID>,
  'addMission' : ActorMethod<[HunterID, string, string], [] | [bigint]>,
  'getAllHunters' : ActorMethod<[], Array<Hunter>>,
  'getAllMissions' : ActorMethod<[], Array<Mission>>,
  'getMissionsForHunter' : ActorMethod<[HunterID], Array<Mission>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
