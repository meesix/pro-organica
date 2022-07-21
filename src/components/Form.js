import React from "react";

function submitForm(e) {
    e.preventDefault();
    const formField = ['proo_name', 'proo_email','proo_phone','proo_company','proo_message'];
    const payload = {};
    
    formField.forEach( e => {
      payload[e] = document.querySelector(`#${e}`).value;
     });
  
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
    console.log(props);
    return (
        <form id="form" onSubmit={submitForm} className={"ProoForm " + props.className||""}>

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
