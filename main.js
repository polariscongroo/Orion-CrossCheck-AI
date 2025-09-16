// talk to OpenAI GPT model (ChatGPT)
// adapted from:
//  https://platform.openai.com/docs/api-reference/making-requests


const openaiURL = "https://api.openai.com/v1/chat/completions";           // can POST to this 3rd party URL
  
const themodel = "gpt-3.5-turbo";       // the OpenAI model we are going to talk to 
    

// default API key and prompt:

var apikey = "";
var theprompt = "hello";


 
// default body is margin 0 and padding 0 
// give it more whitespace:

  $('body').css( "margin", "20px" );
  $('body').css( "padding", "20px" );


 
document.write ( `

<h1> Chat with GPT model </h1>

Running World:
<a href='https://ancientbrain.com/world.php?world=2850716357'>Chat with GPT model</a>.
<br> 
Chat with
  <A HREF="https://platform.openai.com/docs/models/overview">GPT 3.5</A>
 using the 
<A HREF="https://en.wikipedia.org/wiki/OpenAI">OpenAI    </A>  API.
 <br> 
 This is the model
   <A HREF="https://en.wikipedia.org/wiki/ChatGPT">ChatGPT</A>   uses.

<pre>

</pre>

<h3> Enter API key </h3>

The crucial thing is you need an    "API key" to talk to OpenAI. <br>
Register for free and get your API key  
<a href='https://platform.openai.com/account/api-keys'>here</a>.
<br>
You enter your API key below and then chat away.
Then communications to OpenAI come from your IP address using your API key. 
<br>
This World   will never  store your API key. 
You can view the <a href='https://ancientbrain.com/viewjs.php?world=2850716357'> source code</a>  to see that is true!
<p>

<div id=enterkey>
Enter API key: 
	<input    style='width:25vw;'    maxlength='2000'   NAME="apikey"    id="apikey"       VALUE='' >  
	<button onclick='setkey();'  class=ab-normbutton >Set API key</button>
</div>

<pre>

</pre>

<div style="width:60vw; background-color:white;  border: 1px solid black; margin:20; padding: 20px;">
<h3> Enter a "prompt" </h3>
<INPUT style="width:50vw;" id=me value="when did henry vii die?" >
<button onclick="sendchat();"     class=ab-normbutton > Send </button> 
</div>

<div style="width:60vw; background-color:#ffffcc;  border: 1px solid black; margin:20; padding: 20px;">
<h3> GPT replies </h3>
<div id=them > </div>
</div>
 
 <p> <i> Be warned that GPT replies are often completely inaccurate.<br> 
 All LLM systems <a href="https://www.google.com/search?q=llm+hallucination"> "hallucinate"</a>.
 It is how they work. </i> </p>

<pre>

</pre>

` );




function setkey()          
{
	apikey =  jQuery("input#apikey").val();
	apikey = apikey.trim();
	$("#enterkey").html ( "<b> API key has been set. </b>" );
}



// Enter will also send chat:

	document.getElementById('me').onkeydown   = function(event) 	{ if (event.keyCode == 13)  sendchat(); };




// --- Send my line of text ----------------------------------------------------------------

function sendchat()
{
  theprompt = $("#me").val();
  
// construct request as JSON
// "Lowering temperature means it will take fewer risks, and completions will be more accurate and deterministic. Increasing temperature will result in more diverse completions."

var thedata = {
     "model": themodel,
     "temperature": 0.7,
     "messages": [{
         "role": "user", 
         "content": theprompt
        }] 
   };
   
// then as string representing that JSON:
var thedatastring = JSON.stringify ( thedata );   
   
// HTTP headers must be set up with API key: 

$.ajaxSetup({
   headers:
   {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apikey  
   }
});


// POST to 3rd party URL: 

 $.ajax({
    type: "POST",
    url: openaiURL,
    data: thedatastring,
    dataType: "json",
    success: function ( d, rc ) { successfn ( d, rc ); },
      error: function()         { errorfn (); }
 });
 
}


 
 // global variable to examine return data in console 
 var a;
 
 
 
 function successfn ( data, rc )
 {
     a = data;
     var answer = a["choices"][0].message.content;
     $("#them").html ( answer );
 }
 
 function errorfn()
 {
     if ( apikey == "" )    $("#them").html ( "<font color=red><b> Enter API key to be able to chat. </b></font>" );
     else                   $("#them").html ( "<font color=red><b> Unknown error. </b></font>" ); 
 }