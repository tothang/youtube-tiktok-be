variable "environment" {
  description = "The environment to use for the resources (e.g., dev, staging, production)"
  type        = string
  default     = "dev"  # Optional: Provide a default value
}

variable "region" {
  description = "The AWS region where resources will be created"
  type        = string
  default     = "eu-central-1"
}

variable "bucket_name" {
  description = "The AWS region where resources will be created"
  type        = string
  default     = "dev-myspass"
}

variable "resize_bucket_name" {
  type        = string
  default     = "myspass-resize"
}

variable "myspass_strapi_bucket" {
  type        = string
  default     = "myspass-strapi-content"
}