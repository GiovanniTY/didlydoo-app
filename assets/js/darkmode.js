const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle('dark-theme');
    console.log('Dark mode toggled. Current classes on body:', body.className);
};

export { toggleDarkMode };
