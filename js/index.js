const handleCetagory = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await response.json();
  const manu = data.data;
  const tabContainer = document.getElementById('tab-container');

  const handleClick = (categoryId, button) => {
      // Remove inline styles from all category buttons
      const allCategoryButtons = document.querySelectorAll('.tab');
      allCategoryButtons.forEach((button) => {
          button.removeAttribute('style');
      });

      // Change background and text color of the clicked category button
      button.style.backgroundColor = '#007BFF'; // Change to the color you want
      button.style.color = 'white'; // Change to the color you want

      // Call handleLoadNews with the category ID
      handleLoadNews(categoryId);
  };

  manu.forEach((category) => {
      // console.log(category.category_id);
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
}

const handleLoadNews = async (categoryId) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await response.json();
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';




  data.data.forEach((news) => {
    // Generate random hours and minutes (without seconds)
    const randomHours = Math.floor(Math.random() * 24); // Random hours between 0 and 23
    const randomMinutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59

    // Create a string for the random time
    const randomTime = `${randomHours} hours and ${randomMinutes} minutes`;

    const div = document.createElement('div');

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
          <div class="">
            <p>${news.authors[0].profile_name}</p> 
            <span">${news.authors[0].verified}</span>
            <p>${news.others.views}</p>
          </div>
        </div>
      </div>
    
      `

    cardContainer.appendChild(div);
  });
}

// Example usage:
handleLoadNews('yourCategoryId');


handleCetagory()
handleLoadNews(1000)


