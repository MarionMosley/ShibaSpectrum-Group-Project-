
var client_id = '9b04c75febd3444fa95a6ee6face768b';
var client_secret = 'c4dd15239dff43e98b70b0a34e56b44a';
console.log('aaa');

const clientId = '9b04c75febd3444fa95a6ee6face768b';
const clientSecret = 'c4dd15239dff43e98b70b0a34e56b44a';
let token;

const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        }); 

        const data = await result.json();
        token= (data.access_token);
        return data.access_token;
}

console.log(token);

$('#album').click(function() {
    fetch('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

_getToken();