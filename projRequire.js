var projDir = __dirname;
function getModule(module) 
{
    if (module.indexOf("::") > -1 && module.indexOf(".") > -1)
        throw "invalid format in declaring projDir param, both . and :: present, please curtail .js if you have that in the end of the param";

    
    var EndsInJsPattern = new RegExp("\\.js$");
    
    if (module.indexOf("::") > -1 ) {
        module = module.replace(/::/g, "/");
    }
    else if (module.indexOf(".") > -1) {
        module = module.replace(/\./g, "/");
    }
    
    if (!EndsInJsPattern.test(module)) {
        module = module + ".js";
    }
    
    
    return require(projDir + "/"+module);
}

module.exports = GLOBAL.projRequire = getModule;