PSQL = "psql -U postgres -h localhost -p 5432 -d 'nwen304_groupproject'"
serve: frontend/src/* backend/*.js
	cd frontend && yarn && yarn build
	cd backend  && npm i && heroku local web

provisiondb: data.data database.data
	$(PSQL) < database.data
	$(PSQL) < data.data

deploy: serve
	mkdir h_dir
	cp -r backend h_dir
	cp -r frontend/build h_dir
	echo 'make h_dir a part of the heroku project and submit!'
