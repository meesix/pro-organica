import React, { useEffect, useRef } from "react";

function submitForm(e, formStartTime) {
    e.preventDefault();
    
    // Honeypot check - if filled, it's likely a bot
    const honeypot = document.querySelector('#proo_website');
    if (honeypot && honeypot.value) {
      // Silently reject spam but show success message to not alert bots
      document.querySelector('.ProoForm').innerHTML = '<h1 class="mt-0">Thank you for your message</h1><p>our team member will get back to you as soon as possible.</p>';
      return;
    }
    
    const formField = ['proo_name', 'proo_email','proo_phone','proo_company','proo_message'];
    const payload = {};
    
    formField.forEach( e => {
      payload[e] = document.querySelector(`#${e}`).value;
     });
    
    // Add timestamp validation data
    payload.proo_form_time = formStartTime;
    payload.proo_submit_time = Date.now();
  
     const formUrl = 'https://proo.izone.workers.dev';
  
     fetch(formUrl, {
        method:'post', 
        body:JSON.stringify(payload)
      })
      .then(e => {
          if (e.status === 202 || e.status === 200) {
            document.querySelector('.ProoForm').innerHTML = '<h1 class="mt-0">Thank you for your message</h1><p>our team member will get back to you as soon as possible.</p>'
          }
      });
  }


const Form = (props) => {
    const formStartTime = useRef(Date.now());
    
    useEffect(() => {
      // Reset form start time when component mounts
      formStartTime.current = Date.now();
    }, []);
    
    return (
        <form id="form" onSubmit={(e) => submitForm(e, formStartTime.current)} className={"ProoForm " + props.className||""}>

        <div className="ProoForm__Group">
        <label className="ProoForm__GroupItem">
            Name:
            <input id="proo_name" required className="ProoForm__Input" type="text"/>
        </label>

        <label className="ProoForm__GroupItem">
            Email:
            <input id="proo_email" required className="ProoForm__Input" type="email"/>
        </label>
        </div>

        {/* Honeypot field - hidden from users, bots will fill it */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <label>
            Website (leave empty):
            <input id="proo_website" type="text" name="proo_website" tabIndex="-1" autoComplete="off" />
          </label>
        </div>

        <div className="ProoForm__Group">
        <label className="ProoForm__GroupItem">
            Phone:
            <input id="proo_phone" className="ProoForm__Input" type="phone"/>
        </label>

        <label className="ProoForm__GroupItem">
            Company:
            <input id="proo_company" className="ProoForm__Input" type="text"/>
        </label>
        </div>

        <div className="ProoForm__Group">
        <label className="ProoForm__TextareaLabel ProoForm__GroupItem">
            Message: <br/>
            <textarea id="proo_message" required  className="ProoForm__Textarea" name="message"></textarea>
        </label>
        </div>
        <div className="ProoForm__Group">
        <div class="ProoForm__GroupItem"><button className="button-primary" type="submit">Submit</button></div>
        </div>
        </form>
    );
};


export default Form;
