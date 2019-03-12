$(document).on('turbolinks:load', function() {
$(function(){
  function buildSendMessageHTML(message){
    var imagehtml = message.image == null ? "" : '<img src="${message.image.url}" class="lower-message__image">'
    var html = `<div class="message" data-message-id="${message.id} ">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="message__text">
                  ${message.content}
                  </p>
              ${imagehtml}
                </div>
              </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildSendMessageHTML(data);
      $('.messages').append(html)
      // $('.input-box__text').val('')
      //resetはform全てのidにかける必要がある
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate ({scrollTop: $('.messages')[0].scrollHeight},'fast');
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    });
  });



function autoUpdate(){
      var message_id = $('.message:last').data('message-id') || 0;
      // console.log(message_id);
      // console.log('発火');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: message_id },
      dataType: 'json'
    })
    .done(function(data) {
      var insertHTML = '';
      data.forEach(function(message) {
          // #新しいmessageのみbuilidHTMLで作成、次にinsertHTMLに代入
          // if (message.id > message_id) {
          insertHTML += buildSendMessageHTML(message);
          // #buildSendMessageHTMLに加えていく
        // }
      });
      $('.messages').append(insertHTML);
      console.log(this)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      // .messagesに追加
    })
    .fail(function(data){
      alert('自動更新に失敗しました。')
    })
  }

  var interval = setInterval(function(){
    // console.log($('.message').length);
     if (window.location.href.match(/\/groups\/\d+\/messages/)){
       autoUpdate();
     } else {
       clearInterval(interval);
     }
    }, 5000)
  });
});
