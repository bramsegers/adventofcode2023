let input
= require('fs')
. readFileSync('input/aoc03.txt','utf8')
. split`\r\n`

let nums = input
. reduce((p,e,i) => (j=0, e
. match(/\d+|\D+/g)
. map(n => (k = n.length, +n && p
. push([i, j, k, +n]), j += k)), p), [])

let p1 = nums
. reduce((a,[i, j, k, n]) => [-1, 0, 1]
. some(y => (y = input[i + y]) && /[^\d\.]/
. test(y. slice(j - !!j, j + k + 1))) * n + a, 0)

let p2 = input
. reduce((r, e, i) => [...e]
. reduce((a, c, j) => c=='*' && (s=new Set, [i-1,i,i+1]
. map(y => [j - 1, j, j + 1].map(x => (n = nums
. find(([i, j, k]) => i == y && j <= x && x < j + k), n && s
. add(n[3])))), s.size == 2) ? ([p, q] = s, a + p * q) : a, r), 0)

console.log({p1})
console.log({p2})