actor {
  var balance : Nat = 0;

  public shared func addReward(a : Nat) : async Nat {
    balance += a;

    return balance + a;
  };

  public query func getBalance() : async Nat {
    return balance;
  };
};
