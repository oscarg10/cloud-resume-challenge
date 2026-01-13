## Cloud Resume Challenge - AWS Infrastructure

This directory contains the Infrastructure as Code (IaC) for deploying a static website to AWS using S3, CloudFront, and Route 53.

## Architecture

The infrastructure consists of:

- **S3 Buckets**:
  - `ApexBucket`: Apex domain bucket (`oscargresume.it.com`) that redirects to www subdomain
  - `WwwBucket`: Main website bucket (`www.oscargresume.it.com`) hosting the static files

- **CloudFront Distributions**:
  - `CloudFrontDistribution`: Serves content from `WwwBucket` with custom domain `www.oscargresume.it.com`
  - `RedirectCloudFrontDistribution`: Redirects apex domain `oscargresume.it.com` to `www.oscargresume.it.com`

- **Origin Access Control (OAC)**: Secures S3 bucket access, allowing only CloudFront to read objects

- **S3 Bucket Policy**: Grants CloudFront service principal read-only access to the www bucket

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **Domain registered** (e.g., `oscargresume.it.com`)
3. **Route 53 Hosted Zone** created for your domain
4. **ACM Certificate** in `us-east-1` region covering:
   - `oscargresume.it.com`
   - `*.oscargresume.it.com`
   - Status must be `ISSUED` (not `PENDING_VALIDATION`)

### Requesting ACM Certificate

aws acm request-certificate \
  --domain-name oscargresume.it.com \
  --subject-alternative-names www.oscargresume.it.com \
  --validation-method DNS \
  --region us-east-1 \


# Get validation records
aws acm describe-certificate \
  --certificate-arn <certificate-arn> \
  --region us-east-1 \
  --query 'Certificate.DomainValidationOptions[*].ResourceRecord' \
  --output json

# Add CNAME validation records to Route 53 hosted zone
# Wait for certificate status to become "ISSUED"## Installation

### Install Ansible

pip install boto3 botocore
pipx install --include-deps ansible
ansible-galaxy collection install amazon.aws### Install Ansible Collections

ansible-galaxy collection install -r requirements.txt### Configure AWS Credentials

### Create an Ansible vault to store AWS credentials:

cd aws
ansible-vault create playbooks/vaults/prod.ymlAdd the following variables to the vault:

AWS_ACCESS_KEY_ID: <your-access-key>
AWS_SECRET_ACCESS_KEY: <your-secret-key>
AWS_REGION: us-east-1
STACK_NAME: cloud-resume-challenge

### To edit the vault:

ansible-vault edit playbooks/vaults/prod.yml

### To view the vault:

ansible-vault view playbooks/vaults/prod.yml### Fix boto3 Installation Issues

If you encounter boto3 import errors with Ansible, install it in Ansible's virtual environment:

# Find Ansible's Python interpreter
which ansible

# Install boto3 in Ansible's venv (adjust path as needed)
/usr/local/py-utils/venvs/ansible/bin/python -m pip install --upgrade pip
/usr/local/py-utils/venvs/ansible/bin/python -m pip install --upgrade botocore boto3## Deployment

### 1. Deploy Infrastructure

Deploy the CloudFormation stack:

cd aws
./bin/deploy
# Or manually:
ansible-playbook playbooks/deploy.yml --ask-vault-passThe playbook will:
- Create S3 buckets for apex and www domains
- Create CloudFront distributions with custom domain aliases
- Set up Origin Access Control (OAC) for secure S3 access
- Configure bucket policies to allow CloudFront access

**Required Parameters** (in `deploy.yml`):
- `BucketName`: Your domain name (e.g., `oscargresume.it.com`)
- `ACMCertificateArn`: ARN of your ACM certificate in `us-east-1`

### 2. Configure DNS Records

After deployment, add DNS records in Route 53:

**For www subdomain** (CNAME):
aws route53 change-resource-record-sets \
  --hosted-zone-id <your-hosted-zone-id> \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "www.oscargresume.it.com",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [{"Value": "<cloudfront-domain>.cloudfront.net"}]
      }
    }]
  }' \
  --profile <your-profile>
**For apex domain** (A record with alias):
aws route53 change-resource-record-sets \
  --hosted-zone-id <your-hosted-zone-id> \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "oscargresume.it.com",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "<redirect-cloudfront-domain>.cloudfront.net",
          "EvaluateTargetHealth": false
        }
      }
    }]
  }' \
  --profile <your-profile>Get CloudFront domain names from the stack:

# Get www distribution domain
aws cloudformation describe-stack-resources \
  --stack-name cloud-resume-challenge \
  --region us-east-1 \
  --profile <your-profile> \
  --logical-resource-id CloudFrontDistribution \
  --query 'StackResources[0].PhysicalResourceId' \
  --output text | \
xargs -I {} aws cloudfront get-distribution \
  --id {} \
  --profile <your-profile> \
  --query 'Distribution.DomainName' \
  --output text### 3. Upload Website Files

Build and upload your frontend to S3:

./bin/upload
# Or manually:
ansible-playbook playbooks/upload.yml --ask-vault-passThe upload playbook will:
- Install Node.js dependencies
- Build the Vite application
- Upload static assets to S3 bucket (`www.oscargresume.it.com`)
- Upload `index.html` with appropriate cache headers
- Create CloudFront invalidation to clear cache

**Note**: Update `bucket_name` and `cloudfront_distribution_id` in `upload.yml` to match your deployment.

### 4. Invalidate CloudFront Cache

After uploading new files, invalidate the CloudFront cache:

./bin/invalidate
# Or manually:
ansible-playbook playbooks/invalidate.yml --ask-vault-pass## Project Structure
