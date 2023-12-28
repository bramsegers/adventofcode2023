let z3 = require('z3-solver')

let input = require('fs').readFileSync('input/aoc24.txt', 'utf8').split`\r\n`
let S = input.map(e => e.match(/-?\d+/g).map(e => +e))


let p1 = 0
let min = 2e14
let max = 4e14
S.map(([x1, y1, _, a, b], i) =>
  S.map(([x2, y2, _, c, d], j) => {
    let p = b / a
    let q = d / c
    let x = y2 - y1 - q * x2 + p * x1
    let y = p * ((x /= p - q) - x1) + y1
    p1 += i < j
      && min <= x && x <= max
      && min <= y && y <= max
      && (x < x1) == (a < 0)
      && (x < x2) == (c < 0)
  }))

console.log({ p1 })


let solveZ3 = async _ => {
  let ini = await z3.init()
  let ctx = new ini.Context()
  let solver = new ctx.Solver()
  let int = s => ctx.Int.const(s)

  // t0 * dx0 + x0 = t0 * DX + X
  // t0 * dy0 + y0 = t0 * DY + Y
  // t0 * dz0 + z0 = t0 * DZ + Z

  // t1 * dx1 + x1 = t1 * DX + X
  // t1 * dy1 + y1 = t1 * DY + Y
  // t1 * dz1 + z1 = t1 * DZ + Z

  // t2 * dx2 + x2 = t2 * DX + X
  // t2 * dy2 + y2 = t2 * DY + Y
  // t2 * dz2 + z2 = t2 * DZ + Z

  S.slice(0, 3).map(([x, y, z, dx, dy, dz], i) => (
    solver.add(int('t' + i).mul(dx).add(x).eq(int('t' + i).mul(int('DX')).add(int('X')))),
    solver.add(int('t' + i).mul(dy).add(y).eq(int('t' + i).mul(int('DY')).add(int('Y')))),
    solver.add(int('t' + i).mul(dz).add(z).eq(int('t' + i).mul(int('DZ')).add(int('Z'))))
  ))

  await solver.check()
  return solver.model().eval(int('X').add(int('Y')).add(int('Z'))).value()
}

solveZ3().then(p2 => console.log({ p2 }))