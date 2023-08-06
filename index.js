const password = document.getElementById('userinput');
const submit = document.getElementById('submit');
const download = document.querySelector('.download');
const img = document.querySelector('.img');
const results = document.querySelector('.results');
const searchedLists = document.querySelector('.lists');
const invalid = document.querySelector('.invalid');
const head = document.querySelector('.head');
const lenses = document.querySelectorAll('.lens');

password.addEventListener('keyup', function(e){
    e.preventDefault();
    lenses.forEach(function(lens){
        if(e.target.value != ''){
            lens.classList.add('dark');
        } else {
            lens.classList.remove('dark');
        }
    }) 
});

submit.addEventListener('click', function(e){
    e.preventDefault();
    var pwsd = [
        'Common',
        'Not common'
    ];
    var randomPwsd = Math.floor(Math.random() * pwsd.length);

    // Create Result doc
    let result = document.createElement('div');
    result.className = 'result';
    let pgh =  document.createElement('p');
    pgh.className = 'pwsd';
    pgh.innerHTML = 'Password: ' + password.value;
    let pghII =  document.createElement('p');
    pghII.className = 'pwsd';
    pghII.innerHTML = 'Password Length: ' + password.value.length;
    let pghIII =  document.createElement('p');
    pghIII.className = 'pwsd';
    pghIII.innerHTML = 'Is password common or Not?: ' + pwsd[randomPwsd];
    let note =  document.createElement('p');
    note.className = 'note';
    note.innerHTML = `This password is`

 

    localStorage.setItem('password', password.value);
    localStorage.setItem('password length', password.value.length);
    localStorage.setItem('password detail', pghIII.innerHTML);
        const userPassword = localStorage.getItem('password');
        const userPasswordLength = localStorage.getItem( 'password length');
        const userPasswordDetails = localStorage.getItem('password detail')
           // create Searched lists
           let searchedLink =  document.createElement('a');
           searchedLink.className = 'searched-link';
    let searchedListPassword =  document.createElement('li');
    let searchedListPasswordLength =  document.createElement('li');
    let searchedListPasswordDetail =  document.createElement('li');
    searchedListPassword.className = 'list';
    searchedListPasswordLength.className = 'list';
    searchedListPasswordDetail.className = 'list';
    searchedListPassword.innerHTML =  'Password: ' + userPassword;
    searchedListPasswordLength.innerHTML =  'Password Length: ' + userPasswordLength;
    searchedListPasswordDetail.innerHTML =  userPasswordDetails;
    searchedLink.appendChild(searchedListPassword);
    searchedLink.appendChild(searchedListPasswordLength);
    searchedLink.appendChild(searchedListPasswordDetail);
    
    //SideMenu
    searchedLink.addEventListener('click', function(e){
        img.style.display = 'none';
            results.style.display = 'block';
           results.appendChild(result);
           let searchedResult = document.createElement('div')
           searchedResult.textContent = searchedLink.children.innerHTML;
           result.appendChild(searchedResult);
           result.style.margin = '1rem 0'
        //    pgh.innerHTML = searchedListPassword.innerHTML;
        //    pghII.innerHTML = searchedListPasswordLength.innerHTML;
        //    pghIII.innerHTML = searchedListPasswordDetail.innerHTML;
        //    result.appresultndChild(pgh);
        //    result.appendChild(pghII);
        //    result.appendChild(pghIII);
        //    result.appendChild(e);
        //    result.appendChild(note);
           result.appendChild(download);
           
    })
    if(password.value.length > 8 || password.value.length == 8){  
     img.style.display = 'none';
     results.style.display = 'block';
     results.appendChild(result);
     result.appendChild(pgh);
     result.appendChild(pghII);
     result.appendChild(pghIII);
     result.appendChild(note);
     result.appendChild(download);
     searchedLists.appendChild(searchedLink);
    
     password.disabled = true;     
     password.value = ''
     submit.innerHTML = 'Check Again';
     submit.classList.add('again');
     if (submit.classList.contains('again')){
        lenses.forEach(function(lens){
                lens.classList.remove('dark');
            
        }) 
        submit.addEventListener('click', function(e){
            e.preventDefault();
            download.href = '';
            location.reload();
        })
     }

    
        
     // Create a Blob containing the text content
     const downloaded = document.createElement('p');
     downloaded.innerHTML = 'Password: ' + userPassword + ' ' + 'Password Length: ' + userPasswordLength + ' ' + 'Passsword details: ' + userPasswordDetails;
     const blob = new Blob([downloaded.innerHTML], {type: 'text/plain'});
     //Create a Url for the blob
     const url = URL.createObjectURL(blob);

     download.href = url;
     download.download = 'password.txt';
     download.click();
     // Clean up by revoking the url 
     URL.revokeObjectURL(url);

     searchedLists.appendChild(searchedLink);
     invalid.style.display = 'none'

    }  else if (password.value == ''){
        if (results.style.display == 'block'){
            // img.src = './Search Animation.jpg'
            img.style.display = 'block'
            results.appendChild(img);     
        } else {
            // img.src = './Search Animation.jpg'
            invalid.innerHTML = 'Password not found'
        }     
    } else if(password.value.length < 8) {

     invalid.innerHTML = `'${password.value}' is not a valid password...Use strong password combination of letters, numbers and characters(@/#)`

    } else {
        img.style.display = 'block';
        result.style.display = 'none';
        result.appendChild(pgh);
        results.appendChild(result);
       
    }  

    password.value = '';

});

