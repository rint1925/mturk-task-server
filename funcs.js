function enableSubmit(){
    document.getElementById("submitButton").disabled = false;
  }


function _postToServer(params){
    const checkedYes = document.getElementById("yes").checked;
    params.checkedYes = Number(checkedYes);

    sendStr = ''
    for(const key in params){
      sendStr = sendStr + key + '=' +params[key] + '&';
    }
    sendStr = sendStr.slice(0,-1);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', './reciever.php');
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(sendStr);
    
    // for debugging
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
          console.log( xhr.responseText );
      }
    }
}


function _postToMturk(params){
  const form = document.createElement('form');
  form.method = 'post';
  form.action = params.turkSubmitTo + "/mturk/externalSubmit?assignmentId=" + params.assignmentId + "&foo=1";
  document.body.appendChild(form);
  form.submit();
}


function submit(params){
  _postToServer(params);
  _postToMturk(params);
}