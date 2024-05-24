const toggleDarkMode = () => {
    /*const body = document.body;
    body.classList.toggle('dark-theme');
    const section = document.querySelector('section');
    section.classList.toggle('dark-theme');
    console.log('Dark mode toggled. Current classes on body:', body.className);*/
    const body = document.body;
    body.classList.toggle('dark');
    body.querySelectorAll('*').forEach(el => { 
        el.classList.toggle('dark');

    });
        
}

export { toggleDarkMode };
