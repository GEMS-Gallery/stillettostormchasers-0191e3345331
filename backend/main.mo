import Bool "mo:base/Bool";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor {
  // Define types
  type HunterID = Nat;
  type Hunter = {
    id: HunterID;
    name: Text;
    heelHeight: Nat; // in centimeters
  };

  type Mission = {
    id: Nat;
    hunterID: HunterID;
    hurricaneName: Text;
    date: Text;
  };

  // Initialize state
  stable var hunters : [Hunter] = [];
  stable var missions : [Mission] = [];
  stable var nextHunterID : Nat = 0;
  stable var nextMissionID : Nat = 0;

  // Add a new hunter
  public func addHunter(name : Text, heelHeight : Nat) : async HunterID {
    let id = nextHunterID;
    nextHunterID += 1;
    let newHunter : Hunter = {
      id = id;
      name = name;
      heelHeight = heelHeight;
    };
    hunters := Array.append(hunters, [newHunter]);
    id
  };

  // Get all hunters
  public query func getAllHunters() : async [Hunter] {
    hunters
  };

  // Add a new mission
  public func addMission(hunterID : HunterID, hurricaneName : Text, date : Text) : async ?Nat {
    let hunterOpt = Array.find(hunters, func(h : Hunter) : Bool { h.id == hunterID });
    switch (hunterOpt) {
      case (null) { null };
      case (?hunter) {
        let id = nextMissionID;
        nextMissionID += 1;
        let newMission : Mission = {
          id = id;
          hunterID = hunterID;
          hurricaneName = hurricaneName;
          date = date;
        };
        missions := Array.append(missions, [newMission]);
        ?id
      };
    }
  };

  // Get all missions
  public query func getAllMissions() : async [Mission] {
    missions
  };

  // Get missions for a specific hunter
  public query func getMissionsForHunter(hunterID : HunterID) : async [Mission] {
    Array.filter(missions, func(m : Mission) : Bool { m.hunterID == hunterID })
  };
}
