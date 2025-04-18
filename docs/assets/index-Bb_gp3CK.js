var v=Object.defineProperty;var E=(e,t,n)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var b=(e,t,n)=>E(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();const L=`<section class="todoapp">\r
    <header class="header">\r
        <h1>To-dos</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="What needs to be done?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            \r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pending</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a id="all-filter" class="selected filtro" class="selected" href="#/">All</a>\r
            </li>\r
            <li>\r
                <a id="pending-filter" class="filtro" href="#/active">Pending</a>\r
            </li>\r
            <li>\r
                <a id="completed-filter" class="filtro" href="#/completed">Completed</a>\r
            </li>\r
            <li>\r
                \r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Delete completed</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template created by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Developed by <a href="http://todomvc.com">Me</a></p>\r
    <p>Shared by <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,d=[];for(let e=0;e<256;++e)d.push((e+256).toString(16).slice(1));function S(e,t=0){return(d[e[t+0]]+d[e[t+1]]+d[e[t+2]]+d[e[t+3]]+"-"+d[e[t+4]]+d[e[t+5]]+"-"+d[e[t+6]]+d[e[t+7]]+"-"+d[e[t+8]]+d[e[t+9]]+"-"+d[e[t+10]]+d[e[t+11]]+d[e[t+12]]+d[e[t+13]]+d[e[t+14]]+d[e[t+15]]).toLowerCase()}let y;const C=new Uint8Array(16);function k(){if(!y){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");y=crypto.getRandomValues.bind(crypto)}return y(C)}const I=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:I};function O(e,t,n){var o;if(w.randomUUID&&!e)return w.randomUUID();e=e||{};const s=e.random??((o=e.rng)==null?void 0:o.call(e))??k();if(s.length<16)throw new Error("Random bytes length must be >= 16");return s[6]=s[6]&15|64,s[8]=s[8]&63|128,S(s)}class U{constructor(t){b(this,"description","");this.id=O(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={all:"all",completed:"completed",pending:"pending"},i={todos:[],filter:a.all},q=()=>{T(),console.log("InitStore 🍔")},f=()=>{localStorage.setItem("state",JSON.stringify(i))},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.all}=JSON.parse(localStorage.getItem("state"));i.todos=e,i.filter=t},A=(e=a.all)=>{switch(e){case a.all:return[...i.todos];case a.completed:return i.todos.filter(t=>t.done);case a.pending:return i.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},D=e=>{if(!e)throw new Error("Description is required.");i.todos.push(new U(e)),f()},M=e=>{i.todos=i.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},N=e=>{i.todos=i.todos.filter(t=>t.id!==e),f()},P=()=>{i.todos=i.todos.filter(e=>!e.done),f()},F=(e=a.all)=>{if(!Object.hasOwn(a,e))throw new Error(`Option ${e} is not valid.`);i.filter=e,f()},x=()=>i.filter,c={addTodo:D,deleteCompleted:P,deleteTodo:N,getCurrentFilter:x,getTodos:A,initStore:q,loadStore:T,setFilter:F,toggleTodo:M};let h;const H=e=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML=c.getTodos(a.pending).length},$=e=>{if(!e)throw new Error("Todo object is required.");const{done:t,description:n,id:s}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${t?"checked":""}>
            <label>${n}</label>
            <button class="destroy"></button>
        </div>
    `,l=document.createElement("li");return l.innerHTML=o,l.setAttribute("data-id",s),t&&l.classList.add("completed"),l},R=e=>{let t;switch(e){case"all":t=`
                <div class="view">
                    <label>Yay! No tasks left to-do! 😌☁️🛋️</label>
                </div>
            `;break;case"pending":t=`
                <div class="view">
                    <label>No pending tasks found 🙌</label>
                </div>
            `;break;case"completed":t=`
                <div class="view">
                    <label>Nothing completed yet. Keep going! 💪</label>
                </div>
            `;break;default:throw new Error(`Filter ${e} is not valid.`)}const n=document.createElement("li");return n.innerHTML=t,n};let m;const V=(e,t=[],n)=>{if(m||(m=document.querySelector(e)),!m)throw new Error(`Element ${e} not found`);m.innerHTML="",t.length===0?m.append(R(n)):t.forEach(s=>{m.append($(s))})},g={ClearCompleted:".clear-completed",TodoList:".todo-list",TodoInput:"#new-todo-input",FiltersTodo:".filtro",PendingCounter:"#pending-count"},j=e=>{const t=()=>{H(g.PendingCounter)},n=()=>{const r=c.getTodos(c.getCurrentFilter());V(g.TodoList,r,c.getCurrentFilter()),t()};(()=>{const r=document.createElement("div");r.innerHTML=L,document.querySelector(e).append(r),n()})();const s=document.querySelector(g.TodoInput),o=document.querySelector(g.TodoList),l=document.querySelector(g.ClearCompleted),u=document.querySelectorAll(g.FiltersTodo);s.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(c.addTodo(r.target.value),n(),r.target.value="")}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");c.toggleTodo(p.getAttribute("data-id")),n()}),o.addEventListener("click",r=>{if(r.target.tagName==="BUTTON"&&r.target.classList.contains("destroy")){const p=r.target.closest("[data-id]");if(!p)throw new Error("Parent element with data-id attribute not found.");c.deleteTodo(p.getAttribute("data-id")),n()}else return}),l.addEventListener("click",()=>{c.deleteCompleted(),n()}),u.forEach(r=>{r.addEventListener("click",()=>{switch(u.forEach(p=>p.classList.remove("selected")),r.classList.add("selected"),r.getAttribute("id")){case"all-filter":c.setFilter(a.all);break;case"completed-filter":c.setFilter(a.completed);break;case"pending-filter":c.setFilter(a.pending);break}n()})})};c.initStore();j("#app");
