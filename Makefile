db.backup:
	docker-compose exec mysql mysqldump arian_db -u $(USER_NAME) --password=$(PASSWORD) > backup.sql

db.restore:
	docker-compose exec mysql mysql arian_db -u $(USER_NAME) --password=$(PASSWORD) < backup.sql

PROTOS_GEN_DIR=./protogen
grpc.protogen:
	rm -rf $(PROTOS_GEN_DIR) && mkdir -p $(PROTOS_GEN_DIR)
	yarn grpc_tools_node_protoc \
		--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
		--js_out=import_style=commonjs,binary:$(PROTOS_GEN_DIR) \
		--grpc_out=grpc_js:$(PROTOS_GEN_DIR) \
		--ts_out=grpc_js:$(PROTOS_GEN_DIR) \
		-I ./arianrod-protos ./arianrod-protos/*.proto