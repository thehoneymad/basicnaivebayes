var projRequire=require('./projRequire.js');

var utils = projRequire("lib::Utils");
var NaiveBayes = projRequire("lib::NaiveBayes");

(function (title) {
    var classifier = new NaiveBayes();
    
    classifier.learn(['I love Windows Phone, that thing is amazing', 
                    'Awesome this is incredibly perfect, great!!'
    ], 'positive');
    
    classifier.learn('Bad, Laggy thing. Damn. Crap!!', 'negative');
    var category = classifier.classify('Its a real bad thing to say');
    
    utils.assert('negative' === category, title);
})('Basic 3-liner test should return negative');

(function (title) {
    var classifier = new NaiveBayes();
    
    classifier.learn(['Nut rage: Korean Air boss\'s daughter treated crew like slaves', 
                    'Top court upholds Japanese man\'s death sentence for stabbing rampage',
                    'Al-Jazeera journalist\'s colleagues still held in Egypt'
    ], 'negative');

    classifier.learn(['Super Bowl halftime show', 
                    'Joanne Peh talks baby bump and weird cravings',
    ], 'positive');
   
    var category = classifier.classify('Al-Jazeera makes news of Joanne Peh\'s daughter');
    
    utils.assert('positive' === category, title);
})('Basic 5-liner news titles should return positive');

utils.consoleExitPrompt();
