provider "aws" {
  region = var.region
}

data "aws_region" "current" {}

# Data source to get the AWS account ID
data "aws_caller_identity" "current" {}

# Reference the existing S3 Bucket
data "aws_s3_bucket" "talknow" {
  bucket = var.bucket_name
}

# Lambda Function Permission to Allow S3 to Invoke It
resource "aws_lambda_permission" "allow_s3" {
  statement_id  = "AllowS3Invoke"
  action        = "lambda:InvokeFunction"
  function_name = "talknow-serverless-${var.environment}-api"
  principal     = "s3.amazonaws.com"
  source_arn    = data.aws_s3_bucket.talknow.arn
}

# S3 Bucket Notification Configuration
resource "aws_s3_bucket_notification" "s3_to_lambda" {
  bucket = data.aws_s3_bucket.talknow.bucket

  lambda_function {
    lambda_function_arn = "arn:aws:lambda:${var.region}:${data.aws_caller_identity.current.account_id}:function:talknow-serverless-${var.environment}-api"
    events             = ["s3:ObjectCreated:*"]
  }

  depends_on = [
    aws_lambda_permission.allow_s3
  ]
}

# IAM Policy for Lambda to Pass the MediaConvert Role
resource "aws_iam_policy" "mediaconvert_pass_role_policy" {
  name        = "MediaConvertPassRolePolicy-${var.environment}"
  description = "Policy to allow Lambda to pass MediaConvert roles"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = "iam:PassRole"
        Resource = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/service-role/MediaConvert_Default_Role"
      }
    ]
  })
}

# Attach the Policy to Lambda Execution Role
resource "aws_iam_role_policy_attachment" "attach_mediaconvert_policy" {
  role       = "talknow-serverless-${var.environment}-${var.region}-lambdaRole"
  policy_arn = aws_iam_policy.mediaconvert_pass_role_policy.arn
}

