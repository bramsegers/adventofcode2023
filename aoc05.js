let input
= require('fs')
. readFileSync('input/aoc05.txt', 'utf8')
. split`\r\n\r\n`

let nums = e => e.match(/\d+/g).map(Number)
let seed = nums(input.shift())
let map1 = input.map(e => e.split`\n`.slice(1).map(nums))

let p1 = seed
. reduce((p, s) => (map1
. map(m => (m = m
. find(([, b, c]) => b <= s && s < b + c)) && (s
= s + m[0] - m[1])), s < p ? s : p), 1 / 0)

let map2 = map1.map(e => e
. sort((a, b) => a[1] - b[1]))
. map(m => (r = [], e = 0, m
. map(([a, b, c]) => (b > e && r
. push([e, b - 1, 0]), r
. push([b, b + c - 1, a - b]), e = b + c)), r
. push([e, 1 / 0, 0]), r))

let dfs = (a, b, i) => map2[i]
  ?.reduce((m, [p, q, r]) => (
    p = p > a ? p : a,
    q = q < b ? q : b,
    r = p > q ? m : dfs(p + r, q + r, i + 1),
    m = m < r ? m : r), 1 / 0) || a

let p2 = seed
. reduce((m, s, i) => ++i & 1 && (s 
= dfs(s, s + seed[i] - 1, 0)) < m ? s : m, 1 / 0)


console.log({p1})
console.log({p2})