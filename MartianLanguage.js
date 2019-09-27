$(() => {
  let martianDicionary = '';
  let englishDicionary = '';
  let getRomanization = [];
  let { Martian, English } = marsDitionary;
  Martian = Martian.map(word => englishRomanization('Martian', word));
  English = English.map(word => englishRomanization('English', word));
  // console.log('Martian', Martian);
  // console.log('English', English);
  const sorter = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0;

  Martian = Martian.sort((a, b) => sorter(a.Martian, b.Martian));
  English = English.sort((a, b) => sorter(a.English, b.English));
  $.each(Martian, (i, word) => {
    martianDicionary += `<li>
			<martian>${word.Martian}</martian>
			<rom>(${word.romanization})</rom>
			<ipa>${word.IPA}</ipa>
			<pos>${word.POS}</pos>
			<b>${word.English}</b>
		</li>`;
  });
  $('#martian-dicionary ul').html(martianDicionary);

  $.each(English, (i, word) => {
    if (word.English === 'i') {
      word.English = 'I';
    }
    let wordGet = `<b>${word.English}</b>
		<pos>${word.POS}</pos>
		<martian>${word.Martian}</martian>
		<rom>(${word.romanization})</rom>`;
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
  let sounds = `<th> Sound </th>`;
  let romanization = `<th> Romanization </th>`;
  let letters = `<th> Letter </th>`;
  $.each(soundSymbol, (i, word) => {
    sounds += `<td> <ipa>/${word.sound}/</ipa> </td>`;
    romanization += `<td> ${word.romanization} </td>`;
    letters += `<td> <martian>${word.letter}</martian> </td>`;
  });
  $('#spell-rules-data').html(`<table> <tr>${letters}</tr> <tr>${romanization}</tr> <tr>${sounds}</tr> </table>`);

  function englishRomanization(language, englishWord) {
    let getMartian = englishWord.Martian;
    let getNew = '';
    let getIPA = '';
    for (let MartianLetter in getMartian) {
      for (let soundLetter in soundSymbol) {
        soundLetter = soundSymbol[soundLetter];
        switch (getMartian[MartianLetter]) {
          case soundLetter.letter:
            getNew += soundLetter.romanization;
            getIPA += soundLetter.sound;
            break;
          case ',':
            getNew += ', ';
            getIPA += ' ';
            break;
          case ' ':
            getNew += ' ';
            getIPA += ' ';
            break;
        }
      }
			if (/ci/g.test(getIPA)) {
				getIPA = getIPA.replace(/ci/g, 'ki');
			}
			if (/kyi/g.test(getNew)) {
				getNew = getNew.replace(/kyi/g, 'ki');
			}
			if (/sŋ/g.test(getIPA)) {
				getIPA = getIPA.replace(/sŋ/g, 'ŋ');
			}
			if (/sng/g.test(getNew)) {
				getNew = getNew.replace(/sng/g, 'ng');
			}
			if (/ʃʒ/g.test(getIPA)) {
				getIPA = getIPA.replace(/ʃʒ/g, 'ʒ');
			}
			if (/shzh/g.test(getNew)) {
				getNew = getNew.replace(/shzh/g, 'zh');
			}
			if (/(, )+/.test(getNew)) {
				getNew = getNew.replace(/(, )+/, ', ');
			}
			if (/ +/.test(getNew)) {
				getNew = getNew.replace(/ +/, ' ');
			}
    }
    englishWord = { ...englishWord, romanization: getNew, IPA: `/${getIPA}/` };
    return englishWord;
  }
});
