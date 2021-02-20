import line from '@line/bot-sdk'

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
}

export const client = new line.Client(config)

export default ({ app }, inject) => {
  inject('line_bot', () => line)
}
