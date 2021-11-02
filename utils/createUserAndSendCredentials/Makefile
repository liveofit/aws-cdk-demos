ifneq (,$(wildcard .env))
    include .env
    export
endif

.PHONY: deploy destroy synth get_secret
deploy:
	if [ ! -d node_modules ]; then \
	npm install; \
	fi
	cdk --profile ${AWS_PROFILE} deploy --require-approval=never
destroy:
	cdk --profile ${AWS_PROFILE} destroy
synth:
	cdk --profile ${AWS_PROFILE} synth