# basicnaivebayes
___________________________________________

Basic Naive Bayes classification on text

Let's say you want to classify positive and negative sentences.

```
var classifier=new NaiveBayes();


//teach them some lines with desired category, here I used positive and negative

classifier.learn('I love Windows Phone, that thing is amazing', 'positive');
classifier.learn('Awesome this is incredibly perfect, great!!', 'positive');

classifier.learn('Bad, Laggy thing. Damn. Crap!!', 'negative');

//Then check yourself!

var category = classifier.classify('Its a real bad thing to say');
//negative

//voila!
```

