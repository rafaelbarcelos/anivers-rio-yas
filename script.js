document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const quotes = document.querySelectorAll('#quotes .quote');
    const indicators = document.querySelectorAll('.carousel-indicators div');
    let interval = setInterval(nextQuote, 5000); // Altera a frase a cada 5 segundos

    function showQuote(index) {
        quotes.forEach((quote, i) => {
            quote.style.display = i === index ? 'block' : 'none';
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function nextQuote() {
        currentIndex = (currentIndex + 1) % quotes.length; // Garante que o índice volte a 0 após o último item
        showQuote(currentIndex);
    }

    function previousQuote() {
        currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
        showQuote(currentIndex);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (interval) clearInterval(interval);
            showQuote(index);
            setTimeout(() => {
                if (interval) clearInterval(interval);
                interval = setInterval(nextQuote, 5000);
            }, 10000);
        });
    });

    document.querySelector('.carousel-control.left').addEventListener('click', () => {
        if (interval) clearInterval(interval);
        previousQuote();
        interval = setInterval(nextQuote, 5000);
    });

    document.querySelector('.carousel-control.right').addEventListener('click', () => {
        if (interval) clearInterval(interval);
        nextQuote();
        interval = setInterval(nextQuote, 5000);
    });

    showQuote(currentIndex); // Mostra a primeira frase inicialmente
});