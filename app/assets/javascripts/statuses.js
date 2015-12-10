$(function() {
  $(".proxy-version").each(function(index, item) {
    var item = $(item);
    var url = item.data('url');
    $.ajax({
      type: 'get',
      url:  url,
      success: function(response) {
        setItemMessage(item, response);
      },
      error: function(response) {
        setItemErrorMessage(item, response)
      }
    })
  });

  $(".plugin-version").each(function(index, item) {
    var item = $(item);
    var url = item.data('url');
    $.ajax({
      type: 'get',
      url:  url,
      data: {plugin: item.data('plugin')},
      success: function(response) {
        if (response)
          setItemMessage(item, response);
      },
      error: function(response) {
        setItemErrorMessage(item, response)
      }
    })
  });

  $(".proxy-status, .compute-status, .proxy-show-status").each(function(index, item) {
    var item = $(item);
    var url = item.data('url');
    $.ajax({
      type: 'get',
      url:  url,
      success: function(response) {
        setItemStatus(item, response);
      },
      error: function(response) {
        setItemErrorMessage(item, response)
      }
    })
  });

});

function setItemStatus(item, response) {
  if(response.status == "OK") {
    item.attr('title', __('Active'));
    item.addClass('text-success');
    item.html('<span class="glyphicon glyphicon-ok-sign" />');
  } else {
    item.attr('title', response.message);
    item.addClass('text-danger')
    item.html('<span class="glyphicon glyphicon-exclamation-sign" />');
  }
  item.tooltip({html: true});
}

function setItemMessage(item, response) {
  item.attr('title',response.message);
  if(response.success) {
    item.addClass('text-success')
    item.text(response.message);
  } else {
    item.addClass('text-danger')
    item.text(__('Error'));
  }
  item.tooltip({html: true});
}

function setItemErrorMessage(item, response) {
  item.html($('<a />', {class: 'danger', text: __('Error')}));
  item.data({
    content: $('<a />', {href: item.data('url'), text: __('More details')}),
    title: response.statusText,
    html: true
  });
  item.popover();
}
