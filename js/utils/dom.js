// BXMUSIC DOM helpers
function $(selector, root=document){ return root.querySelector(selector); }
function $$(selector, root=document){ return Array.from(root.querySelectorAll(selector)); }
function createEl(tag, attrs={}, children=[]){
  const el=document.createElement(tag);
  Object.entries(attrs).forEach(([key,value])=>{
    if(key==='class') el.className=value;
    else if(key==='text') el.textContent=value;
    else if(key==='html') el.innerHTML=value;
    else el.setAttribute(key,value);
  });
  children.forEach(child=>el.append(child));
  return el;
}
