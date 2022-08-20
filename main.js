//Axios Globals
  //====================================================================================================
  //                               axios Globals starts
  //====================================================================================================

    // for every protected route we need to create tokens like we did in custom header below
    // what if we have many restricted/protected routes
    // we put this token in local storage and validate with our server
    
axios.defaults.headers.common['x-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';






// GET REQUEST
function getTodos() {
    // console.log('GET Request');
    //to get data from any API or link providing data
    // longer way //////////////////////////////////////////////////////////////
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit: 5
    //         }
    // }).then((res => showOutput(res)))
    // .catch(err => console.log(err))

    //[shorter way] ==============================================
    // axios.get('https://jsonplaceholder.typicode.com/todos', {params: {_limit: 5}}).then(res => showOutput(res))
    // .catch(err => console.log(err))

    // [even shorter way] =========================================
    // axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5').then(res => showOutput(res))
    // .catch(err => console.log(err))

    // we dont even need to add a .get as axios is get by default

    // we can set a timeout too, to add some restrictions 
    axios('https://jsonplaceholder.typicode.com/todos?_limit=5', {timeout: 5000})
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  }






  //====================================================================================================
  //                               Post request starts
  //====================================================================================================





  
  // POST REQUEST
  function addTodo() {
    // console.log('POST Request');

    // by this we send data so we change the params => => to data and keep the syntax same.
    /*
      {
    "userId": 1,
    "id": 1,                            <----id gets automatically generated on the server
    "title": "delectus aut autem",      <---- we pass title and completed
    "completed": false
    }
    
    */
   //// longer way of doing ===========================================
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data: {
    //         title:'New todo',
    //         completed: false
    //         }
    // }).then((res => showOutput(res)))
    // .catch(err => console.log(err))

    // shorter way of doing ========================================
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title:'New todo',
        completed: false
    })
    .then((res => showOutput(res)))
    .catch(err => console.log(err))
  }


  //====================================================================================================
  //                               update request starts
  //====================================================================================================


  // we use put or patch
  // put for whole data or entire data update or replace and patch for specific data update/replace.

  // PUT/PATCH REQUEST
  function updateTodo() {
    // console.log('PUT/PATCH Request');

    // put request ---->> this deletes the 'user id' as replacing the whole thing
    // we need to include the "id"  '/1' for updating the data using 'put' request
    // axios.put('https://jsonplaceholder.typicode.com/todos/1', {
    //     title:'updated todo',
    //     completed: true
    // })
    // .then((res => showOutput(res)))
    // .catch(err => console.log(err))

    // patch request --->>>this keeps the user id
    axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
        title:'updated todo',
        completed: true
    })
    .then((res => showOutput(res)))
    .catch(err => console.log(err))

  }





//====================================================================================================
//                               delete starts
//====================================================================================================
  
  // DELETE REQUEST
  function removeTodo() {
    // console.log('DELETE Request');
    // for this we dont need data but "id" which is "/1" here
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then((res => showOutput(res)))
    .catch(err => console.log(err))
  }






//====================================================================================================
//                               getting symultaneous data starts
//====================================================================================================


  
  // SIMULTANEOUS DATA
  function getData() {
    // console.log('Simultaneous Request');
    // axios.all -->> array of request --->> response returns
    // takes array of requests============================
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    // .then(res => {
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[1])
    // })

    // we can use axios.spread with .then to get more descriptive data
    // is a function and we pass two parameters to get and use any one to get data
    .then(axios.spread((todos,posts) => showOutput(posts)))
    .catch(err => console.log(err))
  }




//====================================================================================================
//                             CUSTOM HEADERS  starts
//====================================================================================================



  
  // CUSTOM HEADERS
  function customHeaders() {
    // console.log('Custom Headers');
    // you have to be logged in to create a post

    const config ={
        headers : {
            'content-type' : 'Application/json',
            Authorization: 'sometoke'
        }
    }



    axios
        .post('https://jsonplaceholder.typicode.com/todos', 
        {
        title:'New todo',
        completed: false
        },
        config
        )
        .then((res => showOutput(res)))
        .catch(err => console.log(err))
  }



//====================================================================================================
//                             TRANSFORM requests and responses  starts
//====================================================================================================



  
  // TRANSFORMING REQUESTS & RESPONSES
  // helps us to change or transform the data like receive or send in upper case or make the title uppercase etc.
  function transformResponse() {
    // console.log('Transform Response');
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos', 
        data: {
            title: 'hello world'
        },
        transformResponse:axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    }

    axios(options).then(res => showOutput(res))

  }









  //====================================================================================================
  //                               ERROR HANDLING starts
  //====================================================================================================

 /// if we have no pages to show we need to show a 404 error

  
  // ERROR HANDLING
  function errorHandling() {
    // console.log('Error Handling');
    axios.get('https://jsonplaceholder.typicode.com/todosss',{
        // validateStatus: function(status){
        //     return status < 500;     /// means it rejects status greater or equal to 500
        // }
    })
    .then(res => showOutput(res))
    .catch(err => {
        if (err.response) {
            // if server responded with status other than 200 range means other than success range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

            if(err.response.status===404){
                alert('Error page not found')
            }
        } else if(err.request){
            // request was made but there is no response
            console.log(err.request);
        }else{
            console.log(err.message);
        }
    });

  }



  //====================================================================================================
  //                               CANCEL TOKEN starts
  //====================================================================================================




// we can cancel tockens on fly
  
  // CANCEL TOKEN
  function cancelToken() {
    // console.log('Cancel Token');

    const source = axios.CancelToken.source();



    axios('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown =>{
        if(axios.isCancel(thrown)) {
            console.log('request canceled', thrown.message);
        }
    });


    if(true){
        source.cancel('Request canceled')
    }
  }
  


//====================================================================================================
//                               INTERCEPTORS REQUESTS & RESPONSES starts
//====================================================================================================


  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
    config => {
    console.log(
        `${config.method.toUpperCase()} request sent to ${
            config.url
        } at ${new Date().getTime()}`);

    return config;
  },
  error => {
    return Promise.reject(error);
  }
  
  );







//====================================================================================================
//                             AXIOS INSTANCES starts
//====================================================================================================



  
  // AXIOS INSTANCES
const axiosInstance = axios.create({
    //other custom settings 
    baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.get('/comments').then(res => showOutput(res))

// ========================================================================================== all ended here
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);