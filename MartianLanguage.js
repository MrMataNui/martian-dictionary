$(() => {
  let martianDicionary = '';
  let englishDicionary = '';
const sorter = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0;
let Martian = marsDitionary.Martian;
let English = marsDitionary.English;

Martian = Martian.sort((a, b) => sorter(a.Martian, b.Martian));
English = English.sort((a, b) => sorter(a.English, b.English));
  $.each(Martian, (i, word) => {
    martianDicionary += `<li>
			<martian>${word.Martian}</martian>
			<ipa>${word.IPA}</ipa>
			<pos>${word.POS}</pos>
			<b>${word.English}</b>
		</li>`;
  });
  $('#martian-dicionary ul').html(martianDicionary);

  $.each(English, (i, word) => {
		if (word.English === 'i') { word.English = 'I'; }
    let wordGet = `<b>${word.English}</b>
		<pos>${word.POS}</pos>
		<martian>${word.Martian}</martian>`;
    if (word.POS2) {
      wordGet += `<pos>${word.POS2}</pos> <martian>${word.Martian2}</martian>`;
      if (word.POS3) {
        wordGet += `<pos>${word.POS3}</pos> <martian>${word.Martian3}</martian>`;
        if (word.POS4) {
          wordGet += `<pos>${word.POS4}</pos> <martian>${word.Martian4}</martian>`;
        }
      }
    }
    englishDicionary += `<li> ${wordGet} </li>`;
  });
  $('#english-dicionary ul').html(englishDicionary);

  $('#martian-dicionary').show();
  $('#english-dicionary').hide();

  $('#show-martian').click(() => {
    $('#martian-dicionary').show();
    $('#english-dicionary').hide();
  });
  $('#show-english').click(() => {
    $('#english-dicionary').show();
    $('#martian-dicionary').hide();
  });
	let pronunciation = `<tr> <th>Pronunciation</th> <th>Spelling</th> </tr>`;
  $.each(soundSymbol, (i, word) => {
    pronunciation += `<tr>
			<td> <ipa>/${word.sound}/</ipa> </td>
			<td> <martian>${word.letter}</martian> </td>
		</tr>`;
  });
	$('#spell-rules-data').html(`<table>${pronunciation}</table>`);
});
