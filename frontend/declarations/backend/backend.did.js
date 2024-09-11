export const idlFactory = ({ IDL }) => {
  const HunterID = IDL.Nat;
  const Hunter = IDL.Record({
    'id' : HunterID,
    'name' : IDL.Text,
    'heelHeight' : IDL.Nat,
  });
  const Mission = IDL.Record({
    'id' : IDL.Nat,
    'hurricaneName' : IDL.Text,
    'date' : IDL.Text,
    'hunterID' : HunterID,
  });
  return IDL.Service({
    'addHunter' : IDL.Func([IDL.Text, IDL.Nat], [HunterID], []),
    'addMission' : IDL.Func(
        [HunterID, IDL.Text, IDL.Text],
        [IDL.Opt(IDL.Nat)],
        [],
      ),
    'getAllHunters' : IDL.Func([], [IDL.Vec(Hunter)], ['query']),
    'getAllMissions' : IDL.Func([], [IDL.Vec(Mission)], ['query']),
    'getMissionsForHunter' : IDL.Func(
        [HunterID],
        [IDL.Vec(Mission)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
