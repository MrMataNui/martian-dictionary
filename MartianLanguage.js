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
	const soundSymbol = [
		{ "sound": "æ", "letter": "A" },
		{ "sound": "ɲ", "letter": "C" },
		{ "sound": "ʃ", "letter": "D" },
		{ "sound": "e", "letter": "E" },
		{ "sound": "f", "letter": "F" },
		{ "sound": "ŋ", "letter": "G" },
		{ "sound": "ʔ", "letter": "H" },
		{ "sound": "i", "letter": "I" },
		{ "sound": "ʤ", "letter": "J" },
		{ "sound": "c", "letter": "K" },
		{ "sound": "l", "letter": "L" },
		{ "sound": "m", "letter": "M" },
		{ "sound": "n", "letter": "N" },
		{ "sound": "ɔ", "letter": "O" },
		{ "sound": "x", "letter": "Q" },
		{ "sound": "ɾ", "letter": "R" },
		{ "sound": "s", "letter": "S" },
		{ "sound": "t", "letter": "T" },
		{ "sound": "u", "letter": "U" },
		{ "sound": "ə", "letter": "W" },
		{ "sound": "ʧ", "letter": "X" },
		{ "sound": "j", "letter": "Y" },
		{ "sound": "ʒ", "letter": "Z" }
	];
});
/*
æ > A
ɲ > C
ʃ > D
e > E
f > F
ŋ > G
ʔ > H
i > I
ʤ > J
c > K
l > L
m > M
n > N
ɔ > O
x > Q
ɾ > R
s > S
t > T
u > U
ə > W
ʧ > X
j > Y
ʒ > Z
*/
