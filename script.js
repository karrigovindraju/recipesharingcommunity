
let users = [
    { username: 'user1', password: 'pass1', recipes: [] },
    { username: 'user2', password: 'pass2', recipes: [] }
  ];
  
  let currentUser = null;
  
  function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      currentUser = user;
      showRecipePage();
    } else {
      alert('Invalid username or password. Please try again or register.');
    }
  }
  
  function register() {
    const newUsernameInput = document.getElementById('newUsername');
    const newPasswordInput = document.getElementById('newPassword');
    const newUsername = newUsernameInput.value;
    const newPassword = newPasswordInput.value;
  
    
    if (users.some(u => u.username === newUsername)) {
      alert('Username is already taken. Please choose another username.');
    } else {
      
      const newUser = { username: newUsername, password: newPassword, recipes: [] };
      users.push(newUser);
      currentUser = newUser;
  
      
      updateLocalStorage();
  
      
      showRecipePage();
    }
  }
  
  function showRegistrationForm() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
  }
  
  function showLoginPage() {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('registrationForm').style.display = 'none';
  }
  
  function logout() {
    currentUser = null;
    
    document.getElementById('recipeList').innerHTML = '';
    document.getElementById('currentUser').innerText = '';
    document.getElementById('welcomeMessage').innerText = '';
    showLoginPage();
  }
  
  function showRecipePage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('recipePage').style.display = 'block';
  
    
    document.getElementById('currentUser').innerText = `Welcome, ${currentUser.username}!`;
    
    
    displayRecipes();
  
    
    document.getElementById('logoutBtn').style.display = 'block';
  }
  
  function displayRecipes() {
    const recipeListDiv = document.getElementById('recipeList');
    recipeListDiv.innerHTML = '';
  
    if (currentUser.recipes.length === 0) {
      recipeListDiv.innerHTML = '<p>No recipes yet. Add one!</p>';
    } else {
      currentUser.recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `<strong>${recipe.name}</strong>: ${recipe.content}
                                <p>Uploaded by: ${currentUser.username}</p>
                                <button onclick="editRecipe(${index})">Edit</button>
                                <button onclick="deleteRecipe(${index})">Delete</button>`;
        recipeListDiv.appendChild(recipeDiv);
      });
    }
  
    
    users.forEach(user => {
      if (user !== currentUser) {
        user.recipes.forEach(recipe => {
          const recipeDiv = document.createElement('div');
          recipeDiv.innerHTML = `<strong>${recipe.name}</strong>: ${recipe.content}
                                  <p>Uploaded by: ${user.username}</p>`;
          recipeListDiv.appendChild(recipeDiv);
        });
      }
    });
  }
  
  function showAddRecipeForm() {
    document.getElementById('recipePage').style.display = 'none';
    document.getElementById('recipeForm').style.display = 'block';
  }
  
  function saveRecipe() {
    const recipeNameInput = document.getElementById('recipeName');
    const recipeContentInput = document.getElementById('recipeContent');
  
    const recipeName = recipeNameInput.value;
    const recipeContent = recipeContentInput.value;
  
    if (recipeName && recipeContent) {
      const newRecipe = { name: recipeName, content: recipeContent };
      currentUser.recipes.push(newRecipe);
  
      
      updateLocalStorage();
  
      
      displayRecipes();
  
      
      document.getElementById('recipeForm').style.display = 'none';
      document.getElementById('recipePage').style.display = 'block';
    } else {
      alert('Please enter both recipe name and content.');
    }
  }
  
  function editRecipe(index) {
    const recipeNameInput = document.getElementById('recipeName');
    const recipeContentInput = document.getElementById('recipeContent');
  
    
    recipeNameInput.value = currentUser.recipes[index].name;
    recipeContentInput.value = currentUser.recipes[index].content;
  
    
    document.getElementById('saveBtn').onclick = function () {
      saveEditedRecipe(index);
    };
  
    document.getElementById('recipePage').style.display = 'none';
    document.getElementById('recipeForm').style.display = 'block';
  }
  
  function saveEditedRecipe(index) {
    const recipeNameInput = document.getElementById('recipeName');
    const recipeContentInput = document.getElementById('recipeContent');
  
    const updatedRecipeName = recipeNameInput.value;
    const updatedRecipeContent = recipeContentInput.value;
  
    if (updatedRecipeName && updatedRecipeContent) {
      
      currentUser.recipes[index].name = updatedRecipeName;
      currentUser.recipes[index].content = updatedRecipeContent;
  
      
      updateLocalStorage();
  
      
      displayRecipes();
  
      
      document.getElementById('recipeForm').style.display = 'none';
      document.getElementById('recipePage').style.display = 'block';
    } else {
      alert('Please enter both recipe name and content.');
    }
  }
  
  function deleteRecipe(index) {
    
    const confirmDelete = confirm('Are you sure you want to delete this recipe?');
  
    if (confirmDelete) {
      
      currentUser.recipes.splice(index, 1);
  
      
      updateLocalStorage();
  
      
      displayRecipes();
    }
  }
  
  function cancelRecipe() {
    
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeContent').value = '';
  
    document.getElementById('saveBtn').onclick = saveRecipe;
  
    
    document.getElementById('recipeForm').style.display = 'none';
    document.getElementById('recipePage').style.display = 'block';
  }
  
  function updateLocalStorage() {
    
    localStorage.setItem('recipeAppUsers', JSON.stringify(users));
  }

