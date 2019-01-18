var cases = [
  {set: "U", name: "E1", alg: "R' U' R U' R' U2 R2 U R' U R U2 R'", alts: []},
  {set: "U", name: "E2", alg: "R' F R U' R' U' R U R' F' R U R' U' R' F R F' R", alts: []},
  {set: "U", name: "E3", alg: "R2 D R' U2 R D' R' U2 R'", alts: []},
  {set: "U", name: "E4", alg: "F R U' R' U R U R' U R U' R' F'", alts: []},
  {set: "U", name: "E5", alg: "R2 D' R U2 R' D R U2 R", alts: []},
  {set: "U", name: "E6", alg: "R' U2 R F U' R' U' R U F'", alts: []},
  {set: "Pi", name: "G1", alg: "R U2 R2 U' R2 U' R2 U2 R", alts: []},
  {set: "Pi", name: "G2", alg: "R' F2 R U2 R U2 R' F2 U' R U' R'", alts: []},
  {set: "Pi", name: "G3", alg: "R' U' F' R U R' U' R' F R2 U2 R' U2 R", alts: []},
  {set: "Pi", name: "G4", alg: "R U R' U' R' F R2 U R' U' R U R' U' F'", alts: []},
  {set: "Pi", name: "G5", alg: "R U' L' U R' U L U L' U L", alts: []},
  {set: "Pi", name: "G6", alg: "R U D' R U R' D R2 U' R' U' R2 U2 R", alts: []},
  {set: "H", name: "H1", alg: "R U R' U R U' R' U R U2 R'", alts: []},
  {set: "H", name: "H2", alg: "F R U' R' U R U2 R' U' R U R' U' F'", alts: []},
  {set: "H", name: "H3", alg: "R U R' U R U L' U R' U' L", alts: []},
  {set: "H", name: "H4", alg: "U F R U R' U' R U R' U' R U R' U' F'", alts: []},
  {set: "Anti-Sune", name: "B1", alg: "R' U' R U' R' U2 R", alts: []},
  {set: "Anti-Sune", name: "B2", alg: "U R' U' R U' R' U R' D' R U R' D R2", alts: []},
  {set: "Anti-Sune", name: "B3", alg: "L R' U' R U L' U2 R' U2 R", alts: []},
  {set: "Anti-Sune", name: "B4", alg: "R' U' R U R' F R U R' U' R' F' R2", alts: []},
  {set: "Anti-Sune", name: "B5", alg: "R' U L U' R U L'", alts: []},
  {set: "Anti-Sune", name: "B6", alg: "R U' R' U2 R U' R' U2 R' D' R U R' D R", alts: []},
  {set: "Sune", name: "C1", alg: "R U R' U R U2 R'", alts: []},
  {set: "Sune", name: "C2", alg: "L' U2 L U2 R U' L' U L R'", alts: []},
  {set: "Sune", name: "C3", alg: "L' R U R' U' L U2 R U2 R'", alts: []},
  {set: "Sune", name: "C4", alg: "U' R U R' U R U' R D R' U' R D' R2", alts: []},
  {set: "Sune", name: "C5", alg: "R U' L' U R' U' L", alts: []},
  {set: "Sune", name: "C6", alg: "F' R U2 R' U2 R' F2 R U R U' R' F'", alts: []},
  {set: "T", name: "F1", alg: "U' R U2 R' U' R U R' U' R U R' U' R U' R'", alts: []},
  {set: "T", name: "F2", alg: "R' U2 R' D' R U2 R' D R2", alts: []},
  {set: "T", name: "F3", alg: "R' F' R U R' U' R' F R2 U' R' U2 R", alts: []},
  {set: "T", name: "F4", alg: "x R U' R' D R U R' D' x'", alts: []}, //THIS ONE IS WEIRD FIG GEN ALG
  {set: "T", name: "F5", alg: "U' F R U' R' U' R U2 R' U' F'", alts: []},
  {set: "T", name: "F6", alg: "U' R' U' R U R' F' R U R' U' R' F R2", alts: []},
  {set: "L", name: "D1", alg: "U' R U2 R' U' R U R' U' R U R' U' R U' R'", alts: []},
  {set: "L", name: "D2", alg: "R' U2 R' D' R U2 R' D R2", alts: []},
  {set: "L", name: "D3", alg: "U R U2 R D R' U2 R D' R2", alts: []},
  {set: "L", name: "D4", alg: "U F R' F' r' U R U' r", alts: []}, //ALSO WEIRD
  {set: "L", name: "D5", alg: "U' F R U' R' U' R U2 R' U' F'", alts: []},
  {set: "L", name: "D6", alg: "U' R' U' R U R' F' R U R' U' R' F R2", alts: []}
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
