const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const section = document.querySelector('section');
    section.classList.toggle('dark-theme');
    console.log('Dark mode toggled. Current classes on body:', body.className);
};

export { toggleDarkMode };
