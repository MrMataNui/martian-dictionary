/* what I invented -- MAD LW SGOLARAS */
$(() => {
	let { Martian, English } = marsDitionary;
	Martian.sort(sorter);
	English.sort(sorter);
	Martian = Martian.map(englishRomanization);
	English = English.map(englishRomanization);

	getMartianDictionary(Martian);
	getEnglishDictionary(English);
	getSpellingRules();

	$('#martian-dicionary').show();
	$('#english-dicionary').hide();

	$('#show-martian').click(getToggle);
	$('#show-english').click(getToggle);
});

function sorter(a, b) {
	[a, b] = (a.IPA)
		? [a.Martian, b.Martian]
		: [a.English, b.English];
	return (a < b) ? -1 : 1;
};

function getMartianDictionary(Martian) {
	let martianDicionary = '';
	$.each(Martian, (i, word) => {
		martianDicionary += `<li>
			<martian>${word.Martian}</martian> <b>|</b>
			<rom>(${word.romanization})</rom> <b>|</b>
			<ipa>${word.IPA}</ipa> <b>|</b>
			<pos>${word.POS}</pos> <b>|</b>
			<b>${word.English}</b>
		</li>`;
	});
	$('#martian-dicionary ul').html(martianDicionary);
}

function getEnglishDictionary(English) {
	let englishDicionary = '';
	$.each(English, (i, word) => {
		if (word.English === 'i') { word.English = 'I'; }
		let wordGet = `<b>${word.English}</b> <b>|</b>
		<pos>${word.POS}</pos> <b>|</b>
		<martian>${word.Martian}</martian> <b>|</b>
		<rom>(${word.romanization})</rom>`;
		if (word.POS2) {
			wordGet += `<b>|</b> <pos>${word.POS2}</pos> <b>|</b> <martian>${word.Martian2}</martian>`;
			if (word.POS3) {
				wordGet += `<b>|</b> <pos>${word.POS3}</pos> <b>|</b> <martian>${word.Martian3}</martian>`;
				if (word.POS4) {
					wordGet += `<b>|</b> <pos>${word.POS4}</pos> <b>|</b> <martian>${word.Martian4}</martian>`;
				}
			}
		}
		englishDicionary += `<li> ${wordGet} </li>`;
	});
	$('#english-dicionary ul').html(englishDicionary);
}

function getSpellingRules() {
	let sounds = `<th> Sound </th>`;
	let romanization = `<th> Romanization </th>`;
	let letters = `<th> Letter </th>`;
	$.each(soundSymbol, (i, word) => {
		sounds += `<td> <ipa>/${word.sound}/</ipa> </td>`;
		romanization += `<td> ${word.romanization} </td>`;
		letters += `<td> <martian>${word.letter}</martian> </td>`;
	});
	$('#spell-rules-data').html(`<table> <tr>${letters}</tr> <tr>${romanization}</tr> <tr>${sounds}</tr> </table>`);
}

function getToggle() {
	$('#martian-dicionary').toggle();
	$('#english-dicionary').toggle();
}

function englishRomanization(getWord) {
	let getMartian = getWord.Martian;
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
				case ',': getNew += ', '; getIPA += ' '; break;
				case ' ': getNew += ' '; getIPA += ' '; break;
			}
		}
		if (/ci/g.test(getIPA)) { getIPA = getIPA.replace(/ci/g, 'ki'); }
		if (/kyi/g.test(getNew)) { getNew = getNew.replace(/kyi/g, 'ki'); }

		if (/sŋ/g.test(getIPA)) { getIPA = getIPA.replace(/sŋ/g, 'ŋ'); }
		if (/sng/g.test(getNew)) { getNew = getNew.replace(/sng/g, 'ng'); }

		if (/ʃʒ/g.test(getIPA)) { getIPA = getIPA.replace(/ʃʒ/g, 'ʒ'); }
		if (/shzh/g.test(getNew)) { getNew = getNew.replace(/shzh/g, 'zh'); }

		// if (/c$/.test(getIPA)) { getIPA = getIPA.replace(/c$/, 'k'); }
		// if (/ky$/.test(getNew)) { getNew = getNew.replace(/ky$/, 'k'); }
		// if (/ɲ$/.test(getIPA)) { getIPA = getIPA.replace(/ɲ$/, 'ŋ'); }
		// if (/ny$/.test(getNew)) { getNew = getNew.replace(/ny$/, 'ng'); }

		if (/(, )+/g.test(getNew)) { getNew = getNew.replace(/(, )+/g, ', '); }
		if (/ +/g.test(getNew)) { getNew = getNew.replace(/ +/g, ' '); }
	}
	return { ...getWord, romanization: getNew, IPA: `/${getIPA}/` };
}
