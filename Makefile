serve: frontend/src/* backend/*.js
	cd frontend && yarn build
	cd backend  && heroku local web
