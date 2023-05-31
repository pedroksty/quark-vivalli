// import { app } from './app'

// const port = 4444

// app.listen(port, () => {
//   console.log(`Server listening in port ${port}! 🚀`)
// })

import express from 'express'
import axios from 'axios'
import cors from 'cors'

import { Client } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'

interface IWebhook {
  to: string
  sesiong_id: string
  contact_id: string
  channel_id: string
  type: 'text' | 'image' | 'document' | 'audio' | 'video'
  text?: {
    body: string
  }
  image?: {
    url?: string
    caption?: string
  }
  document?: {
    url?: string
    filename?: string
  }
  audio?: {
    url?: string
  }
  video?: {
    url?: string
    caption?: string
  }
}

const app = express()

const client = new Client({

})

client.on('qr', (qr) => {
  // Generate and scan this code with your phone
  qrcode.generate(qr, { small: true })
  console.log('QR RECEIVED', qr)
})

client.on('ready', () => {
  console.log('Client is ready!')
})

client.on('message', async (msg) => {
  console.log('MESSAGE RECEIVED', msg)

  await axios.post('/api/v4/generic/messages/send', {
    'contacts.0.profile.name': 'Pedro Henrique',
    'contacts.0.profile.photo': 'https://github.com/pedroksty.png',
    'contacts.0.platform_id': '5584994402301',
    'messages.0.from': 'whatsapp',
    'messages.0.id': '5584994402301',
    'messages.0.timestamp': new Date(),
    'messages.0.type': 'text',
    'messages.0.text.body': msg.body
  }, {
    headers: {
      'API-KEY': 'd5B0TxMYnI0e5nSIPXKh-'
    }
  })
})

client.initialize()

app.use(cors())
app.use(express.json())

app.post('/rpa', async (request, response) => {
  const {
    channel_id,
    contact_id,
    sesiong_id,
    to,
    type,
    text

  } = request.body as IWebhook

  console.log(
    contact_id,
    sesiong_id,
    to,
    type,
    text
  )

  const parsedNumber = `${channel_id}@c.us`

  console.log(parsedNumber)

  try {
    await client.sendMessage(parsedNumber, text.body)

    return {
      status: true
    }
  } catch (error) {
    console.log(error)

    return {
      status: true
    }
  }
})

app.listen(4545, () => {
  console.log('[RPA] listening in port 4545! 🚀')
})

// client.sendMessage('5584994402301', 'Teste mensagem')
