$(() => {
  function getLang(langType) {
    $('#lang-phon').css('display', 'none');
    $('#lang-grammar').css('display', 'none');
    $('#lang-lexi').css('display', 'none');

    $(langType).css('display', 'block');
  }

  function navActive(navType) {
    $('#nav-phon a').removeClass('active');
    $('#nav-grammar a').removeClass('active');
    $('#nav-lexi a').removeClass('active');

    $(navType).addClass('active');
  }
  $('#nav-phon a').click(() => {
    getLang('#lang-phon');
    navActive('#nav-phon a');
  });
  $('#nav-grammar a').click(() => {
    getLang('#lang-grammar');
    navActive('#nav-grammar a');
  });
  $('#nav-lexi a').click(() => {
    getLang('#lang-lexi');
    navActive('#nav-lexi a');
  });
  getLang('#lang-phon');
});
