$(function(){
  function buildSendMessageHTML(message){
    var imagehtml = message.image == null ? "" : '<img src="${message.image.url}" class="lower-message__image">'
    var html = `<div class="message">
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
    .done(function(new_message){
      var html = buildSendMessageHTML(new_message);
      $('.messages').append(html)
      $('#message__text').val('')
      $('.messages').animate ({scrollTop: $('.messages')[0].scrollHeight},'fast');
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
  })
});
