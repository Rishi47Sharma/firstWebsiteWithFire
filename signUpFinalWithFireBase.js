// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCla6RLDgG7E3sQfl09z9qvwWrbDfzTH4Q",
    authDomain: "signup-beta-a6f51.firebaseapp.com",
    databaseURL: "https://signup-beta-a6f51-default-rtdb.firebaseio.com",
    projectId: "signup-beta-a6f51",
    storageBucket: "signup-beta-a6f51.appspot.com",
    messagingSenderId: "400535422813",
    appId: "1:400535422813:web:ca8322c8b2366f0eb24ab4"
  };
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    first_name = document.getElementById('first_name').value
    middlename = document.getElementById('middlename').value
    sur_name= document.getElementById('sur_name').value
    mobilenumber= document.getElementById('mobilenumber').value
    city= document.getElementById('city').value
    state= document.getElementById('state').value
    pincode= document.getElementById('pincode').value
    
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(first_name) == false || validate_field(middlename) == false || validate_field(mobilenumber) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        first_name:first_name,
        middlename :middlename,
        sur_name :sur_name,
        mobilenumber :mobilenumber,
        city :city,
        state : state,
        pincode :pincode,
        email : email,
        password : password,
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + pincode.value).set(user_data)
  
      // DOne
      alert('User Created!!')
      window.location.href = 'index .html';
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }