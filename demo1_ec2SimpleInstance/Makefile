ifneq (,$(wildcard .env))
    include .env
    export
endif

.PHONY: deploy destroy synth get_secret
deploy:
	if [ ! -d node_modules ]; then \
	npm install; \
	fi
	cdk --profile ${AWS_PROFILE} bootstrap aws://${AWS_ACCOUNT_NUMBER}/${AWS_REGION} -y
	cdk --profile ${AWS_PROFILE} deploy --require-approval=never
	make get_secret
destroy:
	cdk --profile ${AWS_PROFILE} destroy
synth:
	cdk --profile ${AWS_PROFILE} synth
get_secret:
	aws secretsmanager get-secret-value \
    --secret-id ec2-ssh-key/${INSTANCE_NAME}-ec2key/private \
    --query SecretString \
    --output text > secret.pem
	chmod 600 secret.pem