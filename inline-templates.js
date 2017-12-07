'use strict';
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var eval2 = eval;

/**
 * Inline resources from a string content.
 * @param content {string} The source file's content.
 * @param urlResolver {Function} A resolver that takes a URL and return a path.
 * @returns {string} The content with resources inlined.
 */
function inlineResourcesFromString(content, urlResolver) {
    // Curry through the inlining functions.
    return [inlineTemplate, inlineStyle, removeModuleId].reduce(function(
        prevContent,
        fn
    ) {
        return fn(prevContent, urlResolver);
    },
    content);
}
/**
 * Inline the templates for a source file. Simply search for instances of `templateUrl: ...` and
 * replace with `template: ...` (with the content of the file included).
 * @param content {string} The source file's content.
 * @param urlResolver {Function} A resolver that takes a URL and return a path.
 * @return {string} The content with all templates inlined.
 */
function inlineTemplate(content, urlResolver) {
    return content.replace(
        /templateUrl:\s*[`'"]([^`'"]+?\.html)[`'"]/g,
        function(_m, templateUrl) {
            var templateFile = urlResolver(templateUrl);
            var templateContent = fs.readFileSync(templateFile, 'utf-8');
            var shortenedTemplate = templateContent
                .replace(/([\n\r]\s*)+/gm, ' ')
                .replace(/"/g, '\\"');
            return 'template: "' + shortenedTemplate + '"';
        }
    );
}
/**
 * Inline the styles for a source file. Simply search for instances of `styleUrls: [...]` and
 * replace with `styles: [...]` (with the content of the file included).
 * @param urlResolver {Function} A resolver that takes a URL and return a path.
 * @param content {string} The source file's content.
 * @return {string} The content with all styles inlined.
 */
function inlineStyle(content, urlResolver) {
    return content.replace(/styleUrls:\s*(\[[\s\S]*?\])/gm, function(
        _m,
        styleUrls
    ) {
        var urls = eval2(styleUrls);
        return (
            'styles: [' +
            urls
                .map(function(styleUrl) {
                    var styleFile = urlResolver(styleUrl);
                    var styleContent = fs.readFileSync(styleFile, 'utf-8');
                    var shortenedStyle = styleContent
                        .replace(/([\n\r]\s*)+/gm, ' ')
                        .replace(/"/g, '\\"');
                    return '"' + shortenedStyle + '"';
                })
                .join(',\n') +
            ']'
        );
    });
}
/**
 * Remove every mention of `moduleId: module.id`.
 * @param content {string} The source file's content.
 * @returns {string} The content with all moduleId: mentions removed.
 */
function removeModuleId(content) {
    return content.replace(/\s*moduleId:\s*module\.id\s*,?\s*/gm, '');
}

glob('./lib/**/*.ts', function(err, matches) {
    for (let match of matches) {
        var code = fs.readFileSync(match, { encoding: 'utf-8' });
        var urlResolverFn = function(url) {
            return path.join(path.dirname(match), url);
        };
        var inlined = inlineResourcesFromString(code, urlResolverFn);
        fs.writeFileSync(match, inlined, { encoding: 'utf-8' });
    }
});
