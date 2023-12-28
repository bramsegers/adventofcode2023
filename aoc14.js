let input = require('fs').readFileSync('input/aoc14.txt', 'utf8').split`\r\n`

let H = input.length - 1
let W = input[0].length - 1
let R = input.map(e => [...e])

let load = () => (p = 0, R.map((e, i) => e.map(c => p += (c == 'O') * (H - i + 1))), p)

let tiltN = () => { for (j = 0; j <= W; j++) for (i = k = 0; c = R[i]   ; i++) c[j] == '#' ? k = i + 1 : c[j] == 'O' && (R[i][j] = '.', R[k++][j] = 'O') }
let tiltW = () => { for (i = 0; i <= H; i++) for (j = k = 0; c = R[i][j]; j++) c    == '#' ? k = j + 1 : c    == 'O' && (R[i][j] = '.', R[i][k++] = 'O') }
let tiltS = () => { for (j = 0; j <= W; j++) for (i = k = H; c = R[i]   ; i--) c[j] == '#' ? k = i - 1 : c[j] == 'O' && (R[i][j] = '.', R[k--][j] = 'O') }
let tiltE = () => { for (i = 0; i <= H; i++) for (j = k = W; c = R[i][j]; j--) c    == '#' ? k = j - 1 : c    == 'O' && (R[i][j] = '.', R[i][k--] = 'O') }


tiltN()

console.log({ p1: load() })


for (n = 1e9, s = [], r = 0; r < n; r++)
  tiltN(),
  tiltW(),
  tiltS(),
  tiltE(),
  k = R.map(e => e.join``).join``,
  r = n - (n - r) % (r - s[k]) || r,
  s[k] = r

console.log({ p2: load() })