terraform {
  backend "s3" {
    bucket = "talknow-terraform"
    key = "talknow/state/terraform.tfstate"
    region = "eu-central-1"
    encrypt = true
    dynamodb_table = "terraform-state-lock-table"
  }
}
