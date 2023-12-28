let input = require('fs').readFileSync('input/aoc10.txt', 'utf8').split`\r\n`

let U = [-1,  0, '│┐┌']
let D = [ 1,  0, '│└┘']
let L = [ 0, -1, '─└┌']
let R = [ 0,  1, '─┘┐']

let M1 = { '|': '│', '-': '─', 'L': '└', 'J': '┘', '7': '┐', 'F': '┌' }
let M2 = { 'S': [U, D, L, R], '│': [U, D], '─': [L, R], '└': [U, R], '┘': [U, L], '┐': [D, L], '┌': [D, R] }
let M3 = { '│': '.X. .X. .X.', '─': '... XXX ...', '└': '.X. .XX ...', '┘': '.X. XX. ...', '┐': '... XX. .X.', '┌': '... .XX .X.' }

let PIPES = input.map(e => [...e].map(c => M1[c] || c))

let p1 = ((ans = 0) => {
  let y = PIPES.findIndex(e => e.includes('S'))
  let x = PIPES[y].indexOf('S')
  let q = [[y, x, 'S', 0]]
  PIPES[y][x] += 'X'
  for (let [y, x, c, d] of q)
    for (let [i, j, k] of M2[c])
      PIPES[i += y] &&
      PIPES[i][j += x][1] != 'X' &&
      k.includes(PIPES[i][j][0]) && (
      q.push([i, j, PIPES[i][j][0], d + 1]),
      PIPES[i][j] += 'X',
      ans = d + 1)
  return ans
})()

let p2 = ((ans = 0) => {
  let p = []
  let q = [[0, 0]]
  PIPES.map((e, i) => e.map((c, j) => {
    for (let z, y, x, t = M3[c[y = 0]]; y < 3; y++)
      for (p[z = 3 * i + y] ||= [], x = 0; x < 3; x++)
        p[z][3 * j + x] = c[1] == 'X' ? t ? t.split(' ')[y][x] : c[0] : '.'
  }))
  for (let [i, j] of q) (p[i] || [])[j] != '.' || (
    p[i][j] = 'O', [U, D, L, R].map(([x, y]) => q.push([i + x, j + y])))
  PIPES = PIPES.map((e, i) => e.map((c, j) => (q = p[3 * i + 1][3 * j + 1],
    c = q == 'X' ? c[0] : q, c = c == '.' ? (ans++, 'I') : c)))
  return ans
})()

console.log(PIPES.map(e => e.join``).join`\n`)

console.log({ p1 })
console.log({ p2 })