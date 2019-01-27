var auf = false;
var cases = [
  {set: "U", name: "U1", alg: "R' U' R U' R' U2 R2 U R' U R U2 R'", alts: []},
  {set: "U", name: "U2", alg: "R' F R U' R' U' R U R' F' R U R' U' R' F R F' R", alts: []},
  {set: "U", name: "U3", alg: "U2 R2 D R' U2 R D' R' U2 R'", alts: []},
  {set: "U", name: "U4", alg: "F R U' R' U R U R' U R U' R' F'", alts: []},
  {set: "U", name: "U5", alg: "R2 D' R U2 R' D R U2 R", alts: []},
  {set: "U", name: "U6", alg: "R' U2 R F U' R' U' R U F'", alts: []},
  {set: "Pi", name: "Pi1", alg: "R U2 R2 U' R2 U' R2 U2 R", alts: []},
  {set: "Pi", name: "Pi2", alg: "R' F2 R U2 R U2 R' F2 U' R U' R'", alts: []},
  {set: "Pi", name: "Pi3", alg: "R' U' F' R U R' U' R' F R2 U2 R' U2 R", alts: []},
  {set: "Pi", name: "Pi4", alg: "R U R' U' R' F R2 U R' U' R U R' U' F'", alts: []},
  {set: "Pi", name: "Pi5", alg: "R U' L' U R' U L U L' U L", alts: []},
  {set: "Pi", name: "Pi6", alg: "R U D' R U R' D R2 U' R' U' R2 U2 R", alts: []},
  {set: "H", name: "H1", alg: "R U R' U R U' R' U R U2 R'", alts: []},
  {set: "H", name: "H2", alg: "F R U' R' U R U2 R' U' R U R' U' F'", alts: []},
  {set: "H", name: "H3", alg: "R U R' U R U L' U R' U' L", alts: []},
  {set: "H", name: "H4", alg: "U F R U R' U' R U R' U' R U R' U' F'", alts: []},
  {set: "Anti-Sune", name: "aS1", alg: "R' U' R U' R' U2 R", alts: []},
  {set: "Anti-Sune", name: "aS2", alg: "U R' U' R U' R' U R' D' R U R' D R2", alts: []},
  {set: "Anti-Sune", name: "aS3", alg: "L R' U' R U L' U2 R' U2 R", alts: []},
  {set: "Anti-Sune", name: "aS4", alg: "R' U' R U R' F R U R' U' R' F' R2", alts: []},
  {set: "Anti-Sune", name: "aS5", alg: "R' U L U' R U L'", alts: []},
  {set: "Anti-Sune", name: "aS6", alg: "R U' R' U2 R U' R' U2 R' D' R U R' D R", alts: []},
  {set: "Sune", name: "S1", alg: "R U R' U R U2 R'", alts: []},
  {set: "Sune", name: "S2", alg: "L' U2 L U2 R U' L' U L R'", alts: []},
  {set: "Sune", name: "S3", alg: "L' R U R' U' L U2 R U2 R'", alts: []},
  {set: "Sune", name: "S4", alg: "U' R U R' U R U' R D R' U' R D' R2", alts: []},
  {set: "Sune", name: "S5", alg: "R U' L' U R' U' L", alts: []},
  {set: "Sune", name: "S6", alg: "F' R U2 R' U2 R' F2 R U R U' R' F'", alts: []},
  {set: "L", name: "L1", alg: "U' R U2 R' U' R U R' U' R U R' U' R U' R'", alts: []},
  {set: "L", name: "L2", alg: "R' U2 R' D' R U2 R' D R2", alts: []},
  {set: "L", name: "L3", alg: "R' F' R U R' U' R' F R2 U' R' U2 R", alts: []},
  {set: "L", name: "L4", alg: "R B' R' F R B R' F'", alts: []},
  {set: "L", name: "L5", alg: "U' F R U' R' U' R U2 R' U' F'", alts: []},
  {set: "L", name: "L6", alg: "U' R' U' R U R' F' R U R' U' R' F R2", alts: []},
  {set: "T", name: "T1", alg: "R U2 R' U' R U' R2 U2 R U R' U R", alts: []},
  {set: "T", name: "T2", alg: "R' U R U2 R' L' U R U' L", alts: []},
  {set: "T", name: "T3", alg: "U R' F' r' U R U' r F", alts: []},
  {set: "T", name: "T4", alg: "U2 F R U R' U' R U' R' U' R U R' F'", alts: []},
  {set: "T", name: "T5", alg: "R U R D R' U' R D' R2", alts: []},
  {set: "T", name: "T6", alg: "R' U R2 D r U2 r' D' R2 U' R", alts: []}
];

function generate(input) {
  var moves = [];
  var length = input.length;
  var position = 0;
  var currentchunk = "";
  while (position < length) {
    if (input.charAt(position) !== " ") {
      currentchunk += input.charAt(position);
    } else {
      moves.push(currentchunk);
      currentchunk = "";
    }
    position += 1;
  }
  moves.push(currentchunk);
  currentchunk = "";
  moves.reverse();
  for (num in moves) {
    if (moves[num] == "R") {
      moves[num] = "R'";
    } else if (moves[num] == "R'") {
      moves[num] = "R";
    } else if (moves[num] == "U") {
      moves[num] = "U'";
    } else if (moves[num] == "U'") {
      moves[num] = "U";
    } else if (moves[num] == "L") {
      moves[num] = "L'";
    } else if (moves[num] == "L'") {
      moves[num] = "L";
    } else if (moves[num] == "F") {
      moves[num] = "F'";
    } else if (moves[num] == "F'") {
      moves[num] = "F";
    } else if (moves[num] == "B") {
      moves[num] = "B'";
    } else if (moves[num] == "B'") {
      moves[num] = "B";
    } else if (moves[num] == "D") {
      moves[num] = "D'";
    } else if (moves[num] == "D'") {
      moves[num] = "D";
    }
  }
  var newmoves = "";
  for (m in moves) {
    if (m < moves.length-1) {
      newmoves += moves[m]+" ";
    } else {
      newmoves += moves[m];
    }
  }
  return newmoves;
}
