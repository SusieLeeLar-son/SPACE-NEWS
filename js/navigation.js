const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');


//links navigation to article categories
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const category = link.dataset.category;


        //find articles for each section
        sections.forEach(section => {
            const articles = section.querySelectorAll('article');
            let hasVisible = false;

            //for each article if category 'all' show all articles 
            //or show articles with selected category
            articles.forEach(article => {
                if (category === 'all' || article.dataset.category === category) {
                    article.style.display = 'block';
                    hasVisible = true;
                } else {
                    article.style.display = 'none';
                }
            });

            //hides the entire section if no articles are visible
            section.style.display = hasVisible ? 'block' : 'none';
        });
    });
});