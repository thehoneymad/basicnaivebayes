function NaiveBayes()
{
    // Set the tokenizer first, you guys can definitely go for a custom one!
    this.tokenizer= defaultTokenizer;
    
    //This better be a different module
    this.wordStock={};
    this.wordStockSize=0;
    
    this.totalDocuments=0;
    
    this.docCountPerCategory={};
    this.wordCountPerCategory={};
    
    this.wordFrequencyPerCategory={};
    
    this.categories={};
    
}

NaiveBayes.prototype.initializeCategory = function (categoryName)
{
    if(!this.categories[categoryName])
    {
        this.docCountPerCategory[categoryName]=0;
        this.wordCountPerCategory[categoryName]=0;
        this.wordFrequencyPerCategory[categoryName]={};
        this.categories[categoryName]=true;
    }
    
    return this;
};

NaiveBayes.prototype.getTokenFrequencyTable = function (tokens) 
{
    var frequencyTable = {};
    
    tokens.forEach(function (token) 
    {
        if (!frequencyTable[token])
        frequencyTable[token] = 1;
        else
        frequencyTable[token]++;
        
    });
    
    return frequencyTable;
};

NaiveBayes.prototype.classify=function(text)
{
    var self=this;
    var maxProbability=-Infinity;
    var chosenCategory=null;
    
    var tokens=self.tokenizer(text);
    var tokenFrequencyTable=self.getTokenFrequencyTable(tokens);
    
    Object.keys(self.categories).forEach(function(category){
        
        var categoryProbability=self.docCountPerCategory[category]/self.totalDocuments;
        
        var logProbability=Math.log(categoryProbability);
        
    });
    
    
};

var defaultTokenizer = function (text) 
{
    var rgxPunctuation = /[^\w\s]/g;
    var sanitized = text.replace(rgxPunctuation, ' ');
    return sanitized.split(/\s+/);
};



module.exports.description="A very basic Naive Bayes sentence sentiment classifier";