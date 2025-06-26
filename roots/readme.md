
### DB

### API Endpoints
1. Full list of your testable endpoints
Method	Path	Description	Auth?
GET	/ping	health-check (no auth)	No
POST	/api/v1/auth/register	register new user	No
POST	/api/v1/auth/login	login, returns JWT	No
GET	/api/v1/time-periods	list all time-periods	Yes (Bearer)
GET	/api/v1/time-periods/:id	fetch one time-period by id	Yes (Bearer)
POST	/api/v1/time-periods	create a new time-period	Yes (Bearer)
PUT	/api/v1/time-periods/:id	update an existing time-period	Yes (Bearer)
DELETE	/api/v1/time-periods/:id	delete a time-period	Yes (Bearer)
GET	/api/v1/financial-metrics	list all financial metrics	Yes (Bearer)
GET	/api/v1/financial-metrics/:id	fetch one metric by id	Yes (Bearer)
POST	/api/v1/financial-metrics	create a new financial metric	Yes (Bearer)
PUT	/api/v1/financial-metrics/:id	update an existing financial metric	Yes (Bearer)
DELETE	/api/v1/financial-metrics/:id