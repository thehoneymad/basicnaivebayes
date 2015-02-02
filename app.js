var NaiveBayes = require("./NaiveBayes.js");





module.exports.group={
    TestClassifyString1: function(test)
    {
        var classifier=new NaiveBayes();
        
        classifier.learn('I love Windows Phone, that thing is amazing', 'positive');
        classifier.learn('Awesome this is incredibly perfect, great!!', 'positive');
        
        classifier.learn('Bad, Laggy thing. Damn. Crap!!', 'negative');
        var category = classifier.classify('Its a real bad thing to say');
        
        console.log(category);
        
        test.equal(category, "negative", "Test failed on classification");
        test.done();
    }

}; 
