(function(){
  function updateHomeDate(){
    var el=document.getElementById('homeTodayDateV581');
    if(!el) return;
    var now=new Date();
    var day=now.getDate();
    var month=now.toLocaleDateString('ru-RU',{month:'long'});
    el.textContent='Сегодня: '+day+' '+month;
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',updateHomeDate,{once:true});
  }else{
    updateHomeDate();
  }
})();
