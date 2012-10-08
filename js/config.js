/**
 * Config for RegHex
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 *
 */

var config = {
    parsers : [
        new RegularExpression(
            'javascript',
            [
                new Flag('g', 'global search'),
                new Flag('i', 'ignore case'),
                new Flag('m', 'multiple lines')
            ],
            [ ['https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp', 'Mozilla Javascript Reference'] ],
            ParserJavascript
        ), new RegularExpression(
            'sun-java',
            [
                new Flag('d', 'unix lines'),
                new Flag('i', 'ignore case'),
                new Flag('m', 'multiple lines'),
                new Flag('s', 'dotall mode'),
                new Flag('u', 'unicode-aware case folding'),
                new Flag('x', 'permits whitespace and comments')
            ],
            [ ['http://docs.oracle.com/javase/1.4.2/docs/api/java/util/regex/Pattern.html', 'Oracle Java Reference'] ],
            ParserAjax
        ), new RegularExpression(
            'php',
            [
                new Flag('g', 'global search'),
                new Flag('i', 'ignore case'),
                new Flag('m', 'multiple lines'),
                new Flag('s', 'dotall mode'),
                new Flag('u', 'unicode-aware case folding'),
                new Flag('x', 'permits whitespace and comments')
            ],
            [
                ['http://www.php.net/manual/en/reference.pcre.pattern.modifiers.php', 'PHP Reference'],
                ['http://www.regular-expressions.info/php.html', 'Usage information']
            ],
            ParserAjax
        ), new RegularExpression(
            'gnu-grep',
            [
                new Flag('E', 'extended regexp (egrep)'),
                new Flag('F', 'fixed strings (fgrep)'),
                new Flag('i', 'ignore case'),
                new Flag('v', 'invert match'),
                new Flag('w', 'word regexp'),
                new Flag('x', 'line regexp')
            ],
            [
                ['http://en.wikipedia.org/wiki/Grep', 'Wikipedia'],
                ['http://www.regular-expressions.info/gnu.html', 'Usage information'],
                ['http://pubs.opengroup.org/onlinepubs/9699919799/utilities/grep.html', 'Commands & Utilities Reference']
            ],
            ParserAjax
        ), new RegularExpression(
            'apache-rewriterule',
            [
                new Flag('i', 'ignore case', '[NC]'),
                new Flag('N', 'not operator', '!')
            ],
            [


            ],
            ParserAjax
        )
    ]
};
