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
      console.log(category.category_id);
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
    
    // const result = data
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''

    data.data.forEach((news) => {
      console.log(news.others.views)

        // console.log(news.authors[0].verified) 
        const div = document.createElement('div')
        div.innerHTML = `

        <div class="card bg-base-100 shadow-xl">
        <figure><img src='${news.thumbnail}' alt="Shoes" /></figure>
        <div class="card-body">
          <div class="card-title flex gap-2">
            <img src='${news.authors[0].profile_picture}' alt="" class="w-10 rounded-full">
            
            <h3 class="">${news.title}</h3>
          </div>
          <div class="">
            
            <p>${news.authors[0].profile_name}</p> 
            <span">${news.authors[0].verified}</span>
            <p>${news.others.views}</p>
          </div>
        </div>
      </div>

        
        `
        
        cardContainer.appendChild(div)
    })
}

// const categories = data.data.map(item => item.category);
// categories.forEach(category => console.log(category));
handleCetagory()
handleLoadNews(1000)