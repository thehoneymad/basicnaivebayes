# Very basic sentence sentiment analysis using naive bayes theorem
______________________________________________________________________________

Basic Naive Bayes classification on text

Let's say you want to classify positive and negative sentences.

```javascript
var classifier=new NaiveBayes();


//teach them some lines with desired category, here I used positive and negative

classifier.learn('I love Windows Phone, that thing is amazing', 'positive');
classifier.learn('Awesome this is incredibly perfect, great!!', 'positive');

classifier.learn('My old Pc is getting Bad, Laggy thing. Damn. Crap!! Need to upgrade!', 'negative');

//Then check yourself!

var category = classifier.classify('Its a real bad thing to say');
//negative

//voila!
```

## Opening in Visual Studio 2012/2013
1. Make sure you have installed Visual Studio (Express and Community edition [full-featured Professional edition for free]) 
2. Install Node.js Tools for Visual Studio: http://nodejstools.codeplex.com/
3. Open BasicNaiveBayes.sln
