import{s as A,n as k,o as M}from"../chunks/scheduler.CtbWrGNo.js";import{S as P,i as S,e as _,s as w,c as m,b as v,g as C,a as E,d as b,f as y,h as $,j as h,k as B,t as R,n as j,o as q}from"../chunks/index._PIFkkKJ.js";import{e as D}from"../chunks/each.D6YF6ztN.js";function L(p,t,a){const o=p.slice();return o[1]=t[a].front,o}function H(p){let t,a,o=p[1]+"",d,n,c,x;return{c(){t=_("tr"),a=_("td"),d=R(o),n=w(),c=_("td"),x=w(),this.h()},l(i){t=m(i,"TR",{});var s=v(t);a=m(s,"TD",{class:!0});var f=v(a);d=j(f,o),f.forEach(b),n=E(s),c=m(s,"TD",{class:!0}),v(c).forEach(b),x=E(s),s.forEach(b),this.h()},h(){y(a,"class","w-[1px] whitespace-nowrap border-2 border-neutral-400 px-4 py-2 w-auto"),y(c,"class","w-full border-2 border-neutral-400 px-4 py-2")},m(i,s){$(i,t,s),h(t,a),h(a,d),h(t,n),h(t,c),h(t,x)},p(i,s){s&1&&o!==(o=i[1]+"")&&q(d,o)},d(i){i&&b(t)}}}function I(p){let t,a,o="漢字テスト",d,n,c,x='<tr><th class="border-2 border-neutral-400 px-4 py-2 w-auto">書き</th> <th class="border-2 border-neutral-400 px-4 py-2">読み</th></tr>',i,s,f=D(p[0]),l=[];for(let r=0;r<f.length;r+=1)l[r]=H(L(p,f,r));return{c(){t=_("div"),a=_("h2"),a.textContent=o,d=w(),n=_("table"),c=_("thead"),c.innerHTML=x,i=w(),s=_("tbody");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){t=m(r,"DIV",{class:!0});var u=v(t);a=m(u,"H2",{class:!0,"data-svelte-h":!0}),C(a)!=="svelte-nb44i3"&&(a.textContent=o),d=E(u),n=m(u,"TABLE",{class:!0});var e=v(n);c=m(e,"THEAD",{"data-svelte-h":!0}),C(c)!=="svelte-18xkc1f"&&(c.innerHTML=x),i=E(e),s=m(e,"TBODY",{});var g=v(s);for(let T=0;T<l.length;T+=1)l[T].l(g);g.forEach(b),e.forEach(b),u.forEach(b),this.h()},h(){y(a,"class","text-xl mb-4"),y(n,"class","table-auto w-full border-collapse border-2 border-neutral-500"),y(t,"class","w-full px-8 py-4 flex flex-col items-center mt-4")},m(r,u){$(r,t,u),h(t,a),h(t,d),h(t,n),h(n,c),h(n,i),h(n,s);for(let e=0;e<l.length;e+=1)l[e]&&l[e].m(s,null)},p(r,[u]){if(u&1){f=D(r[0]);let e;for(e=0;e<f.length;e+=1){const g=L(r,f,e);l[e]?l[e].p(g,u):(l[e]=H(g),l[e].c(),l[e].m(s,null))}for(;e<l.length;e+=1)l[e].d(1);l.length=f.length}},i:k,o:k,d(r){r&&b(t),B(l,r)}}}function O(p,t,a){let o=[];return M(()=>{const d=new URLSearchParams(window.location.search);a(0,o=Array.from(d.entries()).map(([n,c])=>({front:n,back:c})))}),[o]}class z extends P{constructor(t){super(),S(this,t,O,I,A,{})}}export{z as component};
