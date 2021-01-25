db.backup:
	docker-compose exec mysql mysqldump arian_db -u $(USER_NAME) --password=$(PASSWORD) > backup.sql

db.restore
	docker-compose exec mysql mysql arian_db -u $(USER_NAME) --password=$(PASSWORD) < backup.sql