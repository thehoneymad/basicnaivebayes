exports.consoleExitPrompt = function () {
    console.log('Press Ctrl + C to exit.')
    process.openStdin().addListener("data", function (d) { });
};

exports.assert = function(condition, title)
{
    if (!condition)
        console.log('\t \033[91m ' + title + ' \033[0m' + ': False');
    else
        console.log('\t \033[1;32m ' + title + ' \033[0m' + ': True');
}