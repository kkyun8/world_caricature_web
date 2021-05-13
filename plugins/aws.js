import AWS from 'aws-sdk'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_DEFAULT_REGION
const bucket = process.env.AWS_BUCKET
const url = process.env.AWS_URL
AWS.config.update({ region })

export const s3 = new AWS.S3({ accessKeyId, secretAccessKey })

export const ddb = new AWS.DynamoDB({
  // local
  // aws dynamodb delete-table --endpoint-url http://localhost:8000 --table-name artists
  // aws dynamodb delete-table --endpoint-url http://localhost:8000 --table-name order_item_labels
  // aws dynamodb delete-table --endpoint-url http://localhost:8000 --table-name orders
  // aws dynamodb delete-table --endpoint-url http://localhost:8000 --table-name products
  endpoint: 'http://localhost:3000/dynamodb',
  region: 'ap-northeast-1',
  accessKeyId,
  secretAccessKey,
})

export default ({ app }, inject) => {
  inject('aws_s3', () => s3)
  inject('aws_bucket', () => bucket)
  inject('aws_url', () => url)
  inject('aws_ddb', () => ddb)
}
