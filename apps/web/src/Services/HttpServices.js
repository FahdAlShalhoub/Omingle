import 'whatwg-fetch'

class HttpService {
    getHash = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('https://localhost/book').then(response => {
                resolve(response.json());
            });
        });
        return promise;
   } 

}


export default HttpService;