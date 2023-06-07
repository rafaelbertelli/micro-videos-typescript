#! /bin/bash

dev:
	@npm run start:dev

create_index:
	@npm run cti create './src/backend/@seedwork/application' -- -i '*.spec.ts' -b
	@npm run cti create './src/backend/@seedwork/constants' -- -i '*.spec.ts' -b
	@npm run cti create './src/backend/@seedwork/domain' -- -i '*.spec.ts' -b
	@npm run cti create './src/backend/@seedwork/errors' -- -i '*.spec.ts' -b
	@npm run cti create './src/backend/@seedwork/repository' -- -i '*.spec.ts' -b
	@npm run cti create './src/backend/@seedwork/validator' -- -i '*.spec.ts' -b

	@npm run cti create './src/backend/category/application' -- -i '*.spec.ts' -b
	@npm run cti create './src/backend/category/domain' -- -i '*.spec.ts' -b
	@npm run cti create './src/backend/category/infra' -- -i '*.spec.ts' -b