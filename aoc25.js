let input = require('fs').readFileSync('input/aoc25.txt', 'utf8')

let K = [...new Set(input.match(/[a-z]+/g))]
let I = input.split`\r\n`.map(e => e.match(/[a-z]+/g).map(e => K.indexOf(e)))
let G = I.reduce((g, [a, ...b]) => (b.map(b => g[a][b] = g[b][a] = 1), g), K.map(_ => []))


// https://www.geeksforgeeks.org/minimum-cut-in-a-directed-graph/

function minCut(g,s,t)

  {C=0,V=[],P=[],R=g.map(e=>[...e]),B=(s,t)=>{q=[s],z=[],P[s]=-1,z
  [s]=1;while((v=q.shift())+1)R.map((e,i)=>z[i]||!R[v][i]||(z[i]=1
  ,q.push(i),P[i]=v));return+z[t]};D=s=>(V[s]=1,R.map((_,i)=>!R[s]
  [i]||V[i]||D(i)));while(B(s,t)){for(w=1/0,v=t;v^s;v=P[v])w=Math.
  min(w,R[P[v]][v]);for(v=t;v^s;v=P[v])R[u=P[v]][v]-=w,R[v][u]+=w}
  D(s);g.map((e,i)=>e.map((c,j)=>c&+V[i]&!V[j]&&C++));return[C,V]}


K.find((_, i) => i && ([cuts, seen] = minCut(G, 0, i), cuts == 3))
A = seen.reduce((a, s) => a + s)
B = K.length - A


console.log({ p1 : A * B})