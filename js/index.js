let cardContainerData = []; // Store news data for sorting

    const handleCategory = async () => {
      const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
      const data = await response.json();
      const categories = data.data;
      const tabContainer = document.getElementById('tab-container');
      const cardContainer = document.getElementById('card-container');

      const handleClick = (categoryId, button) => {
        const allCategoryButtons = document.querySelectorAll('.tab');
        allCategoryButtons.forEach((button) => {
          button.removeAttribute('style');
        });

        button.style.backgroundColor = '#007BFF';
        button.style.color = 'white';

        handleLoadNews(categoryId);
      };

      categories.forEach((category) => {
        console.log(category)
        const div = document.createElement('div');
        const categoryButton = document.createElement('a');
        categoryButton.classList.add('tab');
        categoryButton.textContent = category.category;
        categoryButton.addEventListener('click', () => {
          handleClick(category.category_id, categoryButton);
        });

        div.appendChild(categoryButton);
        tabContainer.appendChild(div);
      });

      const sortByViewsButton = document.getElementById('sort-by-views-button');
      sortByViewsButton.addEventListener('click', () => {
        sortByViews();
      });
    };

    const handleLoadNews = async (categoryId) => {
      const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
      const data = await response.json();
      cardContainerData = data.data.slice(); // Store the data for sorting
      renderNews(cardContainerData);
    };

    const renderNews = (newsData) => {
      const cardContainer = document.getElementById('card-container');
      cardContainer.innerHTML = '';

      if (newsData.length === 0) {
        // If newsData is empty, display "No data available" message
        cardContainer.innerHTML = `
        
      
       <div class="w-3/4 mx-auto bg-black">
       <p class="text-2xl">Oops Sorry,There is no content here</p>
       <img src="img/icon.png">
       </div>
        
       
        `;
      } else {
        newsData.forEach((news) => {
          const div = document.createElement('div');
          const randomHours = Math.floor(Math.random() * 24);
          const randomMinutes = Math.floor(Math.random() * 60);
          const randomTime = `${randomHours} hours and ${randomMinutes} minutes`;

          // Use a ternary operator to conditionally display an icon
          const verifiedIcon = news.authors[0].verified
            ? '<i class="fas fa-check-circle text-blue-700"></i>' // Icon when verified is true
            : ''; // Empty string when verified is false

          div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
              <figure>
                <p class="absolute right-5 bg-black text-white p-2 rounded">${randomTime}</p>
                <img src='${news.thumbnail}' alt="Shoes" class="h-48"/>
              </figure>
              <div class="card-body">
                <div class="card-title flex gap-2">
                  <img src='${news.authors[0].profile_picture}' alt="" class="w-10 h-10 rounded-full">
                  <h4 class="">${news.title}</h4>
                </div>
                <div>
                  <p>${news.authors[0].profile_name} ${verifiedIcon}</p>
                  <p class="views">${news.others.views}</p>
                </div>
              </div>
            </div>
          `;

          cardContainer.appendChild(div);
        });
      }
    };

    const sortByViews = () => {
      const cardContainer = document.getElementById('card-container');
      const newsCards = Array.from(cardContainer.querySelectorAll('.card'));

      // Sort the news cards by views
      newsCards.sort((a, b) => {
        const viewsA = parseInt(a.querySelector('.views').textContent, 10);
        const viewsB = parseInt(b.querySelector('.views').textContent, 10);

        return viewsB - viewsA; // Sort in descending order
      });

      // Clear the card container and append the sorted cards
      cardContainer.innerHTML = '';
      newsCards.forEach((card) => {
        cardContainer.appendChild(card);
      });
    };

    // Example usage:
    handleLoadNews('yourCategoryId');
    handleCategory();
    handleLoadNews(1000);