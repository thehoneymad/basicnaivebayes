function NaiveBayes() {
    // Set the tokenizer first, you guys can definitely go for a custom one!
    this.tokenizer = defaultTokenizer;
    
    //This better be a different module
    this.wordStock = {};
    this.wordStockSize = 0;
    
    this.totalDocuments = 0;
    
    this.docCountPerCategory = {};
    this.wordCountPerCategory = {};
    
    this.wordFrequencyPerCategory = {};
    
    this.categories = {};
}

NaiveBayes.prototype.initializeCategory = function (categoryName) {
    if (!this.categories[categoryName]) {
        this.docCountPerCategory[categoryName] = 0;
        this.wordCountPerCategory[categoryName] = 0;
        this.wordFrequencyPerCategory[categoryName] = {};
        this.categories[categoryName] = true;
    }
    
    return this;
};

NaiveBayes.prototype.getTokenFrequencyTable = function (tokens) {
    var frequencyTable = {};
    
    tokens.forEach(function (token) {
        if (!frequencyTable[token])
            frequencyTable[token] = 1;
        else
            frequencyTable[token]++;
        
    });
    
    return frequencyTable;
};

NaiveBayes.prototype.learn = function (text, category) {
    var self = this;
    var texts = null;
    
    if ('[object Array]' === Object.prototype.toString.call(text)) {
        texts = text;
    }
    else if ('string' === typeof text) {
        texts = [text];
    }
    else {
        throw 'Invalid type for "text"';
    }
    
    texts.forEach(function (line) {
        self.learnALine(line, category);
    });
}

NaiveBayes.prototype.learnALine = function (text, category) {
    var self = this;
    
    self.initializeCategory(category);
    
    self.docCountPerCategory[category]++;
    self.totalDocuments++;
    
    var tokens = self.tokenizer(text);
    var frequencyTable = self.getTokenFrequencyTable(tokens);
    
    Object.keys(frequencyTable).forEach(function (token) {
        if (!self.wordStock[token]) {
            self.wordStock[token] = true;
            self.wordStockSize++;
        }
        
        var frequencyInText = frequencyTable[token];
        
        if (!self.wordFrequencyPerCategory[category][token]) {
            self.wordFrequencyPerCategory[category][token] = frequencyInText;
        }
        else {
            self.wordFrequencyPerCategory[category][token] += frequencyInText;
        }
        
        self.wordCountPerCategory[category] += frequencyInText;
    });
    
    return self;
};

NaiveBayes.prototype.classify = function (text) {
    var self = this;
    var maxProbability = -Infinity;
    var chosenCategory = null;
    var tokens = self.tokenizer(text);
    var tokenFrequencyTable = self.getTokenFrequencyTable(tokens);
    
    Object.keys(self.categories).forEach(function (category) {
        
        var categoryProbability = self.docCountPerCategory[category] / self.totalDocuments;
        var logProbability = Math.log(categoryProbability);
        
        Object.keys(tokenFrequencyTable).forEach(function (token) {
            
            var tokenFrequencyInText = tokenFrequencyTable[token];
            var tokenProbability = self.tokenProbability(token, category);    
            logProbability += tokenFrequencyInText + Math.log(tokenProbability);
        });
        
        if (logProbability > maxProbability) {
            maxProbability = logProbability;
            chosenCategory = category;
        }
    });
    
    return chosenCategory;
};

NaiveBayes.prototype.tokenProbability = function (token, category) {
    var wordCount = this.wordCountPerCategory[category];
    var wordFrequencyCount = this.wordFrequencyPerCategory[category][token] || 0;
    
    return (wordFrequencyCount + 1) / (wordCount + this.wordStockSize);
};

var defaultTokenizer = function (text) {
    var rgxPunctuation = /[^\w\s]/g;
    var sanitized = text.replace(rgxPunctuation, ' ');

    return sanitized.split(/\s+/);
};

NaiveBayes.prototype.description = "A very basic Naive Bayes sentence sentiment classifier";
module.exports = NaiveBayes;

