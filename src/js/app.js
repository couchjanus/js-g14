(function() {

document.querySelector('#dismiss, .overlay').addEventListener('click', function(){
    document.getElementById('sidebar').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
})
    document.getElementById('sidebarCollapse').addEventListener('click', function(){
        document.getElementById('sidebar').classList.add('active');
        document.querySelector('.overlay').classList.add('active');
        document.querySelector('.collapse.in').classList.toggle('in');
        document.querySelector('a[aria-expanded=true]').setAttribute('aria-expanded', 'false');
    })
})();