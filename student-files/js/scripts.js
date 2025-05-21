document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  
  let employees = [];
  
  // Fetch employees
  fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(data => {
    employees = data.results;
    
    employees.forEach((user, index) => {
      const image = user.picture.thumbnail;
      const firstName = user.name.first;
      const lastName = user.name.last;
      const email = user.email;
      const city = user.location.city;
      
      //Create div element and adding className to element
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-index', index);
      
      const cardImgContainer = document.createElement('div');
      cardImgContainer.className = 'card-img-container';
      cardImgContainer.innerHTML = `<img class="card-img" src="${image}" alt="Photo of ${firstName}">`;
      
      const cardInfoContainer = document.createElement('div');
      cardInfoContainer.className = 'card-info-container';
      cardInfoContainer.innerHTML = `
      <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
      <p class="card-text">${email}</p>
      <p class="card-text cap">${city}</p>
      `;
      
      card.appendChild(cardImgContainer);
      card.appendChild(cardInfoContainer);
      gallery.appendChild(card);
    });
    
    // Attach click event after cards are added
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const index = Number(card.getAttribute('data-index'));
        displayModal(index);
      });
    });
  });
  
  // Function to display modal with user details
  function displayModal(index) {
    const user = employees[index];
    
    // Avoid undefined errors
    if (!user || !user.picture) {
      console.error('Invalid user data:', user);
      return;
    }

    //Creating divs and adding className to elements
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    const modal = document.createElement("div");
    modal.className = "modal";
    modalContainer.appendChild(modal);
    
    const closeBtn = document.createElement('button');
    closeBtn.className = "modal-close-btn";
    closeBtn.id = "modal-close-btn";
    closeBtn.textContent = "X";
    modal.appendChild(closeBtn);    

    const modalInfoContainer = document.createElement('div');
    modalInfoContainer.className = "modal-info-container";

    //Attaching information to HTML
    modalInfoContainer.innerHTML = `
    <img class="modal-img" src="${user.picture.thumbnail}" alt="Photo of ${user.name.first}">
    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
    <p class="modal-text">${user.email}</p>
    <p class="modal-text cap">${user.location.city}</p>
    <hr>
    <p class="modal-text">${user.phone}</p>
    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}}</p>
    <p class="modal-text">${new Date(user.dob.date).toLocaleDateString()}</p>
    `;

    modal.appendChild(modalInfoContainer);    
    gallery.after(modalContainer);

    //Close modal on button click
    closeBtn.addEventListener('click', () => {
      modalContainer.style.display = 'none';
    });
  
    // Close modal by clicking outside the modal
    modalInfoContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        modalContainer.style.display = 'none';
      }
    })    
  };
});  