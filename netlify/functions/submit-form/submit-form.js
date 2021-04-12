const sgMail = require('@sendgrid/mail')
const fs = require('fs')
const { GATSBY_SENDGRID_API_KEY } = process.env
    
    
exports.handler = async (event, context, callback) => {

  if (!event.body) {
    body: JSON.stringify({'status':'Welcome','code':200})
  }

  const payload = JSON.parse(event.body).reduce( (p,c) => {
      p[c.key] = c.value;
      return p;
  }, {});

  //define pdf email content and sender
  const msg = { 
    to: 'mee.six@gmail.com',
    from: 'ProOrganica Site <info@proorganica.com>',
    subject: 'New website form submission',
    html: `
    <h2>ProOrganica new form submission</h2>
    <br>
    <p>From: ${payload.proo_name} — ${payload.proo_email} </p>
    <p>Company: ${payload.proo_company} </p>
    <p>Phone: ${payload.proo_phone} </p>
    <br>
    <p>Message:<br> <pre>${payload.proo_message}</pre> </p>
    <p></p>
    
    <br>
    <hr>
    <br>
    
    <p style="color:98b802"><a href="https://proorganica.com">ProOrganica Bot</a></p>
    `,
  }
  
  try {
    sgMail.setApiKey(GATSBY_SENDGRID_API_KEY)
    await sgMail.send(msg)

    return {
      statusCode: 200,
      body: JSON.stringify({'status':'Message sent','code':200})
    }
  } catch (e) {
    return {
      statusCode: e.code,
      body: JSON.stringify({'status':e.message, 'code':e.code}),
    }
  }
}
