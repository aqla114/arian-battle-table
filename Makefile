mysql.backup:
	docker-compose exec mysql mysqldump arian_db -u $(USER_NAME) --password=$(PASSWORD)  > backup.sql