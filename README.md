# exporo spa vuetify

## Local Setup 
TODO Docker Contaier is missing
```
cd application
npm run install
npm run dev
```

## Auth provider
./auth.config.json

###Auth0:

```
{
  "provider" : "auth0",
  "domain": "yxyxxyx.eu.auth0.com",
  "clientId": "xyxyxyxz"
  "audience": "https://yyyyy.eu.auth0.com/api/v2/"
}
````
Tip: You will find your audience key [here](https://manage.auth0.com/#/apis) 

###OneLogin:
```
{
  "provider" : "oidcClient",
  "domain": "xyxyx.onelogin.com",
  "clientId": "xyxyxyxz",
  "audience": ""
}
```


## API Repositories
./src/repositories/Repository.js
./src/repositories/UserRepository.js


## Generic form builder
../src/components/helper/Form2.vue

