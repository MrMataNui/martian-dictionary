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

	$('#show-martian').click(() => {
		$('#martian-dicionary').show();
		$('#english-dicionary').hide();
	});
	$('#show-english').click(() => {
		$('#martian-dicionary').hide();
		$('#english-dicionary').show();
	});
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

function englishRomanization(getWord) {
	let getMartian = getWord.Martian;
	let getRom = '';
	let getIPA = '';
	for (let MartianLetter in getMartian) {
		for (let soundLetter in soundSymbol) {
			soundLetter = soundSymbol[soundLetter];
			switch (getMartian[MartianLetter]) {
				case soundLetter.letter:
					getRom += soundLetter.romanization;
					getIPA += soundLetter.sound;
					break;
				case ',': getRom += ', '; getIPA += ' '; break;
				case ' ': getRom += ' '; getIPA += ' '; break;
			}
		}
		if (/ci/g.test(getIPA)) { getIPA = getIPA.replace(/ci/g, 'ki'); }
		if (/kyi/g.test(getRom)) { getRom = getRom.replace(/kyi/g, 'ki'); }

		if (/sŋ/g.test(getIPA)) { getIPA = getIPA.replace(/sŋ/g, 'ŋ'); }
		if (/sng/g.test(getRom)) { getRom = getRom.replace(/sng/g, 'ng'); }

		if (/ʃʒ/g.test(getIPA)) { getIPA = getIPA.replace(/ʃʒ/g, 'ʒ'); }
		if (/shzh/g.test(getRom)) { getRom = getRom.replace(/shzh/g, 'zh'); }

		// if (/c$/.test(getIPA)) { getIPA = getIPA.replace(/c$/, 'k'); }
		// if (/ky$/.test(getRom)) { getRom = getRom.replace(/ky$/, 'k'); }
		// if (/ɲ$/.test(getIPA)) { getIPA = getIPA.replace(/ɲ$/, 'ŋ'); }
		// if (/ny$/.test(getRom)) { getRom = getRom.replace(/ny$/, 'ng'); }

		if (/(, )+/g.test(getRom)) { getRom = getRom.replace(/(, )+/g, ', '); }
		if (/ +/g.test(getRom)) { getRom = getRom.replace(/ +/g, ' '); }
	}
	return { ...getWord, romanization: getRom, IPA: `/${getIPA}/` };
}
