var assert = require('assert');
var genera = require('../lib/crawler/genera');
var parsenames = require('../lib/crawler/parsenames');
var accessor = require('../lib/crawler/accessor');

var fixture = require('./fixtures/species.json');

describe('genera object', function () {
  it('should create object', function () {
    const text = accessor.getContentFromQuery(fixture);
    const names = parsenames(text);
    const generaObject = genera.createSpeciesObject('Muscicapa caerulescens', names);
    assert.equal('Muscicapa caerulescens', generaObject.scientific_name);
    assert.equal('en', generaObject.common_names[1].lang);
    assert.equal('Askflugsnappare', generaObject.common_names[4].name);
  });
});

// $re = '/Genera:.* == Name/';
// $str = '[[File:SpottedFlycatcheronfence.jpg|thumb|180px|\'\'[[Muscicapa striata]]\'\']] == Taxonavigation == {{Muscicapidae}} Genera: {{g|Alethe}} {{g|Anthipes}} {{g|Brachypteryx}} {{g|Calliope}} {{g|Campicoloides}} {{g|Cercotrichas}} {{g|Cichladusa}} {{g|Cinclidium (Muscicapidae)|Cinclidium}} {{g|Copsychus}} {{g|Cossypha}} {{g|Cossyphicula}} {{g|Cyanoptila}} {{g|Cyornis}} {{g|Emarginata}} {{g|Empidornis}} {{g|Enicurus}} {{g|Erithacus}} {{g|Eumyias}} {{g|Ficedula}} {{g|Fraseria}} {{g|Heinrichia}} {{g|Heteroxenicus}} {{g|Humblotia}} {{g|Irania}} {{g|Larvivora}} {{g|Leonardina}} {{g|Luscinia}} {{g|Melaenornis}} {{g|Monticola}} {{g|Muscicapa}} {{g|Muscicapella}} {{g|Myiomela}} {{g|Myioparus}} {{g|Myophonus}} {{g|Myrmecocichla}} {{g|Namibornis}} {{g|Niltava}} {{g|Oenanthe (Muscicapidae)|Oenanthe}} {{g|Phoenicurus}} {{g|Pinarochroa}} {{g|Pinarornis}} {{g|Pogonocichla}} {{g|Pseudalethe}} {{g|Saxicola}} {{g|Sheppardia}} {{g|Stiphrornis}} {{g|Swynnertonia}} {{g|Tarsiger}} {{g|Thamnolaea}} {{glast|Vauriella}} == Name == {{zfg|Muscicapidae}} {{aut|[[Fleming]]}}, 1822. \'\'Philosophy of zoology\'\' 2: [http://biodiversitylibrary.org/page/20134737 240] ==Selected references== {{Manegold & Brink, 2011}} {{Sangster et al., 2010}} {{Zuccon & Ericson, 2010}} ==Vernacular names== {{VN |de=Fliegenschnäpper |en=Old World flycatcher |hr=Muharice |hy=Կեռնեխներ |ko=딱새과 |mk=Муварчиња |sh=Muharice / мухарице |tr=Sinekkapangiller |th=วงศ์นกจับแมลงและนกเขน|zh=鹟科}} {{Commons|Category:Muscicapidae|Muscicapidae}}';
//
// preg_match_all($re, $str, $matches);
//
// // Print the entire match result
// print_r($matches);
