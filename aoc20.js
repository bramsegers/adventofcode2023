let input = require('fs').readFileSync('input/aoc20.txt', 'utf8').split`\r\n`

let modules = Object.keys(m =
  input.reduce((m, s) => (s = s.split` -> `,
    type = s[0][0],
    outs = s[1].split`, `,
    name = s[0].slice(type != 'b'),
    m[name] = { type, state: 0, ins: {}, outs }, m), {})).
    map(src => m[src].outs.map(dst => m[dst] && (m[dst].ins[src] = 0))) && m


let lo = 0
let hi = 0
let phase = {}

let gcd = (a, b) => b ? gcd(b, a % b) : a
let lcm = (a, b) => b / gcd(a, b) * a


for (let pres = 1; pres <= 1e4; pres++) {
  let Q = [['button', 'broadcaster', 0]]
  for (let [src, dst, pulse] of Q) {
    send = false
    recv = modules[dst]
    lo += pres <= 1e3 && !pulse
    hi += pres <= 1e3 &&  pulse
    recv?.type == 'b' && (send = 1)
    recv?.type == '%' && !pulse && (recv.state ^= 1, send = 1)
    recv?.type == '&' && (recv.ins[src] = pulse, recv.state = 1 - Object.values(recv.ins).every(e => e), send = 1)
    pulse && recv?.outs.includes('rx') && (phase[src] ||= pres)
    send && recv.outs.map(e => Q.push([dst, e, recv.state]))
  }
}


console.log({ p1: lo * hi })
console.log({ p2: Object.values(phase).reduce(lcm) })