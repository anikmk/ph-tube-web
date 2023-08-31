const handleCetagory = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    console.log(data.data)
    const manu = data.data
    const tabContainer = document.getElementById('tab-container');
    manu.forEach((categorys) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onClick="handleLoadNews('${categorys.category_id}')" class="tab">${categorys.category}</a> 
        `
        tabContainer.appendChild(div)
        
    });
    
}

const handleLoadNews = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);

    const data = await response.json();

    const cardContainer = document.getElementById('card-container')

    data.data.forEach((news) => {
        console.log(news.others.views)
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