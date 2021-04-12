const sgMail = require('@sendgrid/mail')
const fs = require('fs')
const { GATSBY_SENDGRID_API_KEY } = process.env
    
    
exports.handler = async (event, context, callback) => {
  const {body} = JSON.parse(event)
  
  //define pdf email content and sender
  const msg = { 
    to: 'mee.six@gmail.com',
    from: 'info@proorganica.com',
    subject: 'New website form submission',
    html: `
    <p>Email body</p>
    
    `,
  }
  
  try {
    sgMail.setApiKey(GATSBY_SENDGRID_API_KEY)
    await sgMail.send(msg)

    return {
      statusCode: 200,
      body: 'Message sent',
    }
  } catch (e) {
    return {
      statusCode: e.code,
      body: e.message,
    }
  }
}
