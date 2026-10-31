(()=>{const nav=document.querySelector('.navbar');const update=()=>nav?.classList.toggle('compact',scrollY>50);addEventListener('scroll',update,{passive:true});update()})();
